"use client";

import type { ContactTopic } from "@/content/home";
import { inkStroke } from "@/shared/drawn-layer/ink-stroke";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

type TopicOption = { value: ContactTopic; label: string };

type TopicSelectProps = {
  id: string;
  name: string;
  label: string;
  labelClassName: string;
  options: readonly TopicOption[];
  invalid: boolean;
  describedBy?: string;
  requiredMessage: string;
};

/**
 * Select-only combobox (WAI-ARIA APG pattern) styled like the other form
 * fields. Focus stays on the trigger; the highlighted option is announced via
 * `aria-activedescendant`. A visually hidden, required input carries the value
 * so the form submits and validates exactly as the native select did.
 */
export function TopicSelect({
  id,
  name,
  label,
  labelClassName,
  options,
  invalid,
  describedBy,
  requiredMessage,
}: TopicSelectProps) {
  const [value, setValue] = useState<ContactTopic | "">("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // The active option is only shaded once the visitor hovers or uses the
  // keyboard, so a fresh click-open shows no highlight on the first option.
  const [showActive, setShowActive] = useState(false);
  const [missing, setMissing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typeaheadRef = useRef({ query: "", timeout: 0 });
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;
  const missingId = `${id}-required`;

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  // The form resets itself after a successful send; mirror that here.
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;

    function onReset() {
      setValue("");
      setMissing(false);
      setIsOpen(false);
    }

    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  useEffect(() => {
    const typeahead = typeaheadRef.current;
    return () => window.clearTimeout(typeahead.timeout);
  }, []);

  function open(index = selectedIndex >= 0 ? selectedIndex : 0) {
    setActiveIndex(index);
    setIsOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    setValue(option.value);
    setMissing(false);
    setIsOpen(false);
  }

  function typeahead(key: string) {
    const state = typeaheadRef.current;
    window.clearTimeout(state.timeout);
    state.query += key.toLowerCase();
    state.timeout = window.setTimeout(() => {
      state.query = "";
    }, 500);

    const start = isOpen ? activeIndex : Math.max(selectedIndex, 0);
    const ordered = [...options.slice(start + 1), ...options.slice(0, start + 1)];
    const match = ordered.find((option) => option.label.toLowerCase().startsWith(state.query));
    if (!match) return;

    const index = options.indexOf(match);
    if (isOpen) setActiveIndex(index);
    else open(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = options.length - 1;
    setShowActive(true);

    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        open();
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        open(event.key === "Home" ? 0 : last);
      } else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
        typeahead(event.key);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (event.altKey) choose(activeIndex);
        else setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
      case "PageUp":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
      case "PageDown":
        event.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(activeIndex);
        break;
      case "Tab":
        choose(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      default:
        if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
          typeahead(event.key);
        }
    }
  }

  const showInvalid = invalid || missing;
  const describedByIds = [missing ? missingId : describedBy].filter(Boolean).join(" ");

  return (
    <div ref={rootRef}>
      <span id={labelId} className={labelClassName}>
        {label}
      </span>

      <input
        ref={inputRef}
        name={name}
        value={value}
        required
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={() => {}}
        onInvalid={(event) => {
          // Swap the browser bubble for the site's own error line.
          event.preventDefault();
          setMissing(true);
          if (event.currentTarget.form?.querySelector(":invalid") === event.currentTarget) {
            triggerRef.current?.focus();
          }
        }}
      />

      <div className="relative">
        <div
          ref={triggerRef}
          id={id}
          role="combobox"
          tabIndex={0}
          aria-labelledby={labelId}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-required="true"
          aria-invalid={showInvalid ? true : undefined}
          aria-describedby={describedByIds || undefined}
          aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
          className="text-ink border-subtle layout:text-[0.9375rem] focus-visible:outline-ink group mt-2 flex w-full cursor-pointer touch-manipulation items-center justify-between gap-4 border-b py-1.5 font-sans text-base leading-[1.5] select-none focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              open();
              setShowActive(false);
            }
          }}
          onKeyDown={onKeyDown}
          onBlur={(event) => {
            if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setIsOpen(false);
          }}
        >
          <span className="min-w-0 truncate">{selected ? selected.label : " "}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={`text-ink h-2 w-3 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M1 1.5 6 6.5 11 1.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeWidth: inkStroke(1.6) }}
            />
          </svg>
        </div>

        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          // Opens as a rectangle growing downward from the field's rule; the
          // negative side and bottom insets leave room for the shadow.
          className={`border-ink bg-paper-light border-signature absolute inset-x-0 top-full z-20 mt-2 py-1 shadow-[0_10px_24px_-14px_color-mix(in_srgb,var(--ink)_45%,transparent)] transition-[clip-path,visibility] ease-[cubic-bezier(0.32,0,0.67,0)] ${
            isOpen
              ? "visible duration-[350ms] [clip-path:inset(0_-2rem_-2rem_-2rem)]"
              : "pointer-events-none invisible duration-[250ms] [clip-path:inset(0_-2rem_100%_-2rem)]"
          }`}
          onPointerDown={(event) => event.preventDefault()}
          onPointerLeave={() => setShowActive(false)}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = isOpen && index === activeIndex;

            return (
              // Keyboard selection runs on the combobox via aria-activedescendant.
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                className={`text-ink tablet:px-4 relative mx-1 flex min-h-11 cursor-pointer items-center gap-4 px-3 font-mono text-xs font-bold tracking-[0.12em] transition-colors duration-150 ${
                  isSelected || (isActive && showActive) ? "bg-band" : ""
                }`}
                onPointerMove={() => {
                  setActiveIndex(index);
                  setShowActive(true);
                }}
                onClick={() => {
                  choose(index);
                  triggerRef.current?.focus();
                }}
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 10"
                  className={`h-2.5 w-3 shrink-0 transition-opacity duration-150 ${isSelected ? "opacity-100" : "opacity-0"}`}
                >
                  <path
                    d="M1 5.5 4.5 9 11 1"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ strokeWidth: inkStroke(1.6) }}
                  />
                </svg>
                {index < options.length - 1 ? (
                  // A hand-drawn rule inset to the text edge on both sides.
                  <span
                    aria-hidden="true"
                    className="tablet:inset-x-4 pointer-events-none absolute inset-x-3 -bottom-[3px] z-[1] block h-1.5"
                  >
                    <svg
                      viewBox="0 0 400 6"
                      preserveAspectRatio="none"
                      className="ink text-connector block h-full w-full overflow-visible"
                    >
                      <path
                        d="M1 3.4C70 2.2 130 4.2 205 3s130-1.4 194 .6"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ strokeWidth: inkStroke(1) }}
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      {missing ? (
        <p
          id={missingId}
          className="text-copy-muted mt-1.5 font-mono text-[0.59375rem] leading-[1.45] tracking-[0.08em]"
        >
          {requiredMessage}
        </p>
      ) : null}
    </div>
  );
}
