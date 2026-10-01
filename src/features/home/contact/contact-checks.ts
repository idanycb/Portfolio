import { resolve4, resolve6, resolveMx } from "node:dns/promises";
import { isIP } from "node:net";

import type { ContactFormContent, ContactTopic } from "@/content/home";

import { disposableDomains } from "./disposable-domains";

const CONTACT_TOPICS: ReadonlySet<string> = new Set(["role", "collaboration", "other"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IP_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_WINDOW_MS = 24 * 60 * 60 * 1000;
const IP_LIMIT = 3;
const GLOBAL_LIMIT = 50;
const DNS_TIMEOUT_MS = 3000;
const TURNSTILE_TIMEOUT_MS = 8000;

const attemptsByIp = new Map<string, number[]>();
let globalAttempts: number[] = [];

export type ContactField = "name" | "email" | "topic" | "message";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

type ContactSubmission = {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
};

type ValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; fieldErrors: Partial<Record<ContactField, string>> };

type AddressLookupResult = "found" | "missing" | "error";

function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function isContactTopic(value: string): value is ContactTopic {
  return CONTACT_TOPICS.has(value);
}

function dnsErrorCode(error: unknown) {
  if (typeof error !== "object" || error === null || !("code" in error)) return undefined;
  return typeof error.code === "string" ? error.code : undefined;
}

export function validateContactSubmission(
  formData: FormData,
  errors: ContactFormContent["fieldErrors"],
): ValidationResult {
  const name = formString(formData, "name")
    .replace(/[\r\n]+/g, " ")
    .trim();
  const email = formString(formData, "email").trim();
  const topicValue = formString(formData, "topic")
    .replace(/[\r\n]+/g, "")
    .trim();
  const message = formString(formData, "message").trim();
  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (name.length < 1 || name.length > 100) fieldErrors.name = errors.name;
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) fieldErrors.email = errors.email;
  if (!isContactTopic(topicValue)) fieldErrors.topic = errors.topic;
  if (message.length < 10 || message.length > 5000) fieldErrors.message = errors.message;

  if (Object.keys(fieldErrors).length > 0 || !isContactTopic(topicValue)) {
    return { success: false, fieldErrors };
  }

  return {
    success: true,
    data: { name, email, topic: topicValue, message },
  };
}

export function getEmailDomain(email: string) {
  return email.slice(email.lastIndexOf("@") + 1).toLowerCase();
}

export function isDisposableEmailDomain(domain: string) {
  const labels = domain.toLowerCase().split(".");

  return labels.some((_, index) => disposableDomains.has(labels.slice(index).join(".")));
}

export function getClientIp(requestHeaders: Headers) {
  const cloudflareIp = requestHeaders.get("cf-connecting-ip")?.trim();
  if (cloudflareIp && isIP(cloudflareIp)) return cloudflareIp;

  const forwardedIp = requestHeaders.get("x-forwarded-for")?.split(",", 1)[0]?.trim();
  return forwardedIp && isIP(forwardedIp) ? forwardedIp : "unknown";
}

export function consumeContactRateLimit(ip: string, now = Date.now()) {
  const ipCutoff = now - IP_WINDOW_MS;
  const globalCutoff = now - GLOBAL_WINDOW_MS;

  for (const [address, timestamps] of attemptsByIp) {
    const recent = timestamps.filter((timestamp) => timestamp > ipCutoff);
    if (recent.length > 0) attemptsByIp.set(address, recent);
    else attemptsByIp.delete(address);
  }

  globalAttempts = globalAttempts.filter((timestamp) => timestamp > globalCutoff);
  const ipAttempts = attemptsByIp.get(ip) ?? [];

  if (ipAttempts.length >= IP_LIMIT) return false;
  if (globalAttempts.length >= GLOBAL_LIMIT) return false;

  ipAttempts.push(now);
  attemptsByIp.set(ip, ipAttempts);
  globalAttempts.push(now);
  return true;
}

export async function verifyTurnstileToken(token: string, secret: string, remoteIp: string) {
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (isIP(remoteIp)) body.set("remoteip", remoteIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
    });

    if (!response.ok) return false;
    const result: unknown = await response.json();
    return (
      typeof result === "object" &&
      result !== null &&
      "success" in result &&
      result.success === true
    );
  } catch (error) {
    console.error(
      "Contact form Turnstile verification failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return false;
  }
}

async function lookupAddress(
  resolver: (hostname: string) => Promise<readonly string[]>,
  domain: string,
): Promise<AddressLookupResult> {
  try {
    const addresses = await resolver(domain);
    return addresses.length > 0 ? "found" : "missing";
  } catch (error) {
    const code = dnsErrorCode(error);
    return code === "ENODATA" || code === "ENOTFOUND" ? "missing" : "error";
  }
}

async function checkMailDomain(domain: string) {
  try {
    const records = await resolveMx(domain);

    if (records.length > 0) {
      const hasNullMx =
        records.length === 1 && (records[0]?.exchange === "" || records[0]?.exchange === ".");
      return !hasNullMx;
    }
  } catch (error) {
    const code = dnsErrorCode(error);
    if (code === "ENOTFOUND") return false;
    if (code !== "ENODATA") return true;
  }

  const [ipv4, ipv6] = await Promise.all([
    lookupAddress(resolve4, domain),
    lookupAddress(resolve6, domain),
  ]);

  if (ipv4 === "found" || ipv6 === "found") return true;
  if (ipv4 === "missing" && ipv6 === "missing") return false;
  return true;
}

export async function hasDeliverableMailDomain(domain: string) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const result = await Promise.race([
    checkMailDomain(domain).finally(() => {
      if (timeout) clearTimeout(timeout);
    }),
    new Promise<true>((resolve) => {
      timeout = setTimeout(() => resolve(true), DNS_TIMEOUT_MS);
    }),
  ]);

  return result;
}
