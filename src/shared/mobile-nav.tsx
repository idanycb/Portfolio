"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type MobileNavItem = {
  number: string;
  label: string;
  labelShort?: string;
  href: `#${string}` | `/#${string}`;
};

export type MobileNavProps = {
  items: readonly MobileNavItem[];
  navId?: string;
  openLabel?: string;
  closeLabel?: string;
};

export function MobileNav({
  items,
  navId = "mobile-primary-navigation",
  openLabel = "MENU",
  closeLabel = "CLOSE",
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function closeAndReturnFocus() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="layout:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-controls={navId}
        aria-expanded={isOpen}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 bg-ink px-4 font-mono text-xs font-bold tracking-[0.16em] text-paper transition-colors hover:bg-ink-soft hover:text-paper active:translate-y-px"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{isOpen ? closeLabel : openLabel}</span>
        <span aria-hidden className="relative block h-3.5 w-3.5">
          <span
            className={`absolute top-1/2 left-0 block h-px w-3.5 bg-current transition-transform ${isOpen ? "rotate-45" : "-translate-y-1"}`}
          />
          <span
            className={`absolute top-1/2 left-0 block h-px w-3.5 bg-current transition-transform ${isOpen ? "-rotate-45" : "translate-y-1"}`}
          />
        </span>
      </button>
      <nav
        id={navId}
        aria-label="Mobile primary navigation"
        hidden={!isOpen}
        className="fixed inset-x-0 top-[69px] z-30 border-b-[1.5px] border-ink bg-band"
      >
        <div className="grid grid-cols-1 px-5 py-2">
          {items.map((item, index) => (
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center gap-4 border-b border-rule py-3 font-mono text-xs font-bold tracking-[0.12em] text-ink last:border-b-0 hover:text-link-hover"
              onClick={closeAndReturnFocus}
            >
              <span className="text-muted">{item.number}</span>
              <span>{item.labelShort ?? item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
