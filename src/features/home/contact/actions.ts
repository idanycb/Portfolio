"use server";

import { homeContent } from "@/content/home";
import { headers } from "next/headers";

import {
  consumeContactRateLimit,
  getClientIp,
  getEmailDomain,
  hasDeliverableMailDomain,
  isDisposableEmailDomain,
  validateContactSubmission,
  verifyTurnstileToken,
  type ContactActionState,
} from "./contact-checks";

const MINIMUM_COMPLETION_MS = 3000;
const RESEND_TIMEOUT_MS = 10000;

const formCopy = homeContent.contact.form;

function successState(): ContactActionState {
  return { status: "success", message: formCopy.successMessage };
}

function genericErrorState(): ContactActionState {
  return { status: "error", message: formCopy.genericErrorMessage };
}

function requiredEnvironment() {
  const values = {
    RESEND_API_KEY: process.env.RESEND_API_KEY?.trim(),
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY?.trim(),
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL?.trim(),
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL?.trim(),
  };
  const missing = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    console.error(`Contact form missing required environment variables: ${missing.join(", ")}`);
    return null;
  }

  return values as Record<keyof typeof values, string>;
}

export async function sendContact(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  if (String(formData.get("website") ?? "").trim()) return successState();

  const now = Date.now();
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || startedAt <= 0 || now - startedAt < MINIMUM_COMPLETION_MS) {
    return successState();
  }

  const requestHeaders = await headers();
  const clientIp = getClientIp(requestHeaders);
  if (!consumeContactRateLimit(clientIp, now)) {
    return { status: "error", message: formCopy.rateLimitMessage };
  }

  const validation = validateContactSubmission(formData, formCopy.fieldErrors);
  if (!validation.success) {
    return {
      status: "error",
      message: formCopy.validationErrorMessage,
      fieldErrors: validation.fieldErrors,
    };
  }

  const domain = getEmailDomain(validation.data.email);
  if (isDisposableEmailDomain(domain)) {
    return {
      status: "error",
      message: formCopy.validationErrorMessage,
      fieldErrors: { email: formCopy.fieldErrors.disposableEmail },
    };
  }

  const environment = requiredEnvironment();
  if (!environment) return genericErrorState();

  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
  const passedTurnstile = await verifyTurnstileToken(
    turnstileToken,
    environment.TURNSTILE_SECRET_KEY,
    clientIp,
  );
  if (!passedTurnstile) return genericErrorState();

  if (!(await hasDeliverableMailDomain(domain))) {
    return {
      status: "error",
      message: formCopy.validationErrorMessage,
      fieldErrors: { email: formCopy.fieldErrors.unreachableEmail },
    };
  }

  const topic = formCopy.topics.find((option) => option.value === validation.data.topic)?.label;
  const receivedAt = new Date(now).toISOString();
  const text = [
    `Name: ${validation.data.name}`,
    `Email: ${validation.data.email}`,
    `Topic: ${topic ?? validation.data.topic}`,
    `Received: ${receivedAt}`,
    "",
    "Message:",
    validation.data.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${environment.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: environment.CONTACT_FROM_EMAIL,
        to: environment.CONTACT_TO_EMAIL,
        reply_to: validation.data.email,
        subject: `[Portfolio] ${topic ?? validation.data.topic} — ${validation.data.name}`,
        text,
      }),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      console.error(
        `Contact form Resend request failed (${response.status}): ${responseBody.slice(0, 1000)}`,
      );
      return genericErrorState();
    }
  } catch (error) {
    console.error(
      "Contact form Resend request failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return genericErrorState();
  }

  return successState();
}
