"use client";

import type { ContactFormContent } from "@/content/home";
import Script from "next/script";
import { useActionState, useCallback, useEffect, useRef } from "react";

import { sendContact } from "./actions";
import type { ContactActionState, ContactField } from "./contact-checks";

export const TURNSTILE_SITE_KEY = "0x4AAAAAAFImjValRPi0xGwS";

type TurnstileOptions = {
  sitekey: string;
  appearance: "interaction-only";
  size: "compact";
  theme: "light";
};

declare global {
  interface Window {
    turnstile?: {
      render(container: HTMLElement, options: TurnstileOptions): string;
      reset(widgetId: string): void;
      remove(widgetId: string): void;
    };
  }
}

const initialState: ContactActionState = { status: "idle" };
const fieldClassName =
  "text-ink border-subtle layout:text-[0.9375rem] focus-visible:outline-ink mt-2 block w-full rounded-none border-0 border-b bg-transparent px-0 py-1.5 font-sans text-base leading-[1.5] focus-visible:outline-2 focus-visible:outline-offset-2";
const labelClassName =
  "text-copy-muted layout:text-[0.625rem] block font-mono text-[0.59375rem] font-bold tracking-[0.14em]";

function FieldError({ field, state }: { field: ContactField; state: ContactActionState }) {
  const error = state.fieldErrors?.[field];
  if (!error) return null;

  return (
    <p
      id={`contact-${field}-error`}
      className="text-copy-muted mt-1.5 font-mono text-[0.59375rem] leading-[1.45] tracking-[0.08em]"
    >
      {error}
    </p>
  );
}

export function ContactForm({ content }: { content: ContactFormContent }) {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const renderTurnstile = useCallback(() => {
    if (!turnstileContainerRef.current || !window.turnstile || turnstileWidgetIdRef.current) {
      return;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      appearance: "interaction-only",
      size: "compact",
      theme: "light",
    });
  }, []);

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
    renderTurnstile();

    return () => {
      const widgetId = turnstileWidgetIdRef.current;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      turnstileWidgetIdRef.current = null;
    };
  }, [renderTurnstile]);

  useEffect(() => {
    if (state.status === "idle") return;

    if (state.status === "success") formRef.current?.reset();
    if (state.status === "error" && state.fieldErrors) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
    }
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());

    const widgetId = turnstileWidgetIdRef.current;
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, [state]);

  const fieldError = (field: ContactField) => state.fieldErrors?.[field];

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderTurnstile}
      />
      <form ref={formRef} action={formAction} aria-busy={pending}>
        <input ref={startedAtRef} type="hidden" name="startedAt" />
        <div
          aria-hidden="true"
          className="absolute top-auto left-[-10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="tablet:mt-12 tablet:gap-10 mt-10 grid gap-8">
          <div>
            <label htmlFor="contact-name" className={labelClassName}>
              {content.fields.name.label}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              aria-invalid={fieldError("name") ? true : undefined}
              aria-describedby={fieldError("name") ? "contact-name-error" : undefined}
              className={fieldClassName}
            />
            <FieldError field="name" state={state} />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClassName}>
              {content.fields.email.label}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              aria-invalid={fieldError("email") ? true : undefined}
              aria-describedby={fieldError("email") ? "contact-email-error" : undefined}
              className={fieldClassName}
            />
            <FieldError field="email" state={state} />
          </div>

          <div>
            <label htmlFor="contact-topic" className={labelClassName}>
              {content.fields.topic.label}
            </label>
            <select
              id="contact-topic"
              name="topic"
              required
              defaultValue=""
              aria-invalid={fieldError("topic") ? true : undefined}
              aria-describedby={fieldError("topic") ? "contact-topic-error" : undefined}
              className={`${fieldClassName} cursor-pointer`}
            >
              <option value="" disabled hidden />
              {content.topics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
            <FieldError field="topic" state={state} />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClassName}>
              {content.fields.message.label}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              aria-invalid={fieldError("message") ? true : undefined}
              aria-describedby={fieldError("message") ? "contact-message-error" : undefined}
              className={`${fieldClassName} tablet:min-h-28 min-h-24 resize-y`}
            />
            <FieldError field="message" state={state} />
          </div>
        </div>

        <div ref={turnstileContainerRef} className="mt-4" />

        <div className="tablet:mt-10 mt-8">
          <button
            type="submit"
            disabled={pending}
            className="border-ink bg-ink text-paper hover:bg-ink-soft focus-visible:outline-ink border-signature font-display tablet:px-10 inline-flex min-h-12 w-full touch-manipulation items-center justify-start px-5 py-3 text-[0.8125rem] font-extrabold transition-[color,background-color,transform,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? content.pendingLabel : content.submitLabel}
          </button>
          <p
            aria-live="polite"
            className={`mt-3 min-h-5 font-mono text-[0.625rem] leading-[1.5] tracking-[0.08em] ${
              state.status === "success" ? "text-ink" : "text-copy-muted"
            }`}
          >
            {state.message}
          </p>
        </div>
      </form>
    </>
  );
}
