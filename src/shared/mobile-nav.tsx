"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

import { HashLink } from "./hash-link";

type MobileNavItem = {
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
        className="group flex min-h-11 min-w-11 items-center justify-center font-mono text-[0.65625rem] font-bold tracking-[0.16em]"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="bg-ink text-paper group-hover:bg-ink-soft flex h-8 items-center gap-2 px-3.5 transition-colors">
          {/* Both labels share one grid cell so the box is always as wide as the longer one. */}
          <span className="grid">
            <span className={`col-start-1 row-start-1 ${isOpen ? "invisible" : ""}`}>
              {openLabel}
            </span>
            <span className={`col-start-1 row-start-1 ${isOpen ? "" : "invisible"}`}>
              {closeLabel}
            </span>
          </span>
          <span aria-hidden className="relative block h-3 w-3">
            <span
              className={`absolute top-[calc(50%-0.75px)] left-0 block h-[1.5px] w-3 bg-current transition-transform ${isOpen ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute top-[calc(50%-0.75px)] left-0 block h-[1.5px] w-3 bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute top-[calc(50%-0.75px)] left-0 block h-[1.5px] w-3 bg-current transition-transform ${isOpen ? "-rotate-45" : "translate-y-1"}`}
            />
          </span>
        </span>
      </button>
      {/* Stays mounted so closing can animate; `inert` and the visibility
          transition keep it out of the tab order and the a11y tree when shut.
          Visibility only transitions on close: on open it must flip at once,
          or the panel is still hidden when the first link takes focus. */}
      <nav
        id={navId}
        aria-label="Mobile primary navigation"
        inert={!isOpen}
        className={`border-ink bg-band border-b-signature fixed inset-x-0 top-[69px] z-30 grid ${
          isOpen
            ? "visible grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "invisible grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-300 ease-[cubic-bezier(0.64,0,0.78,0)]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid grid-cols-1 px-5 py-2">
            {items.map((item, index) => (
              <HashLink
                ref={index === 0 ? firstLinkRef : undefined}
                key={item.href}
                href={item.href}
                style={{ "--stagger": `${120 + index * 55}ms` } as CSSProperties}
                className={`text-ink hover:text-link-hover group/item relative flex min-h-11 items-center gap-4 py-3 font-mono text-xs font-bold tracking-[0.12em] transition-[opacity,translate] motion-reduce:delay-0 ${
                  isOpen
                    ? "translate-y-0 opacity-100 delay-(--stagger) duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    : "-translate-y-3 opacity-0 duration-150"
                }`}
                onClick={closeAndReturnFocus}
              >
                <span
                  className={`text-muted transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:delay-0 ${
                    isOpen ? "translate-x-0 delay-(--stagger)" : "-translate-x-2"
                  }`}
                >
                  {item.number}
                </span>
                <span>{item.labelShort ?? item.label}</span>
                {/* Divider draws left-to-right just behind its row. */}
                <span
                  aria-hidden
                  className={`border-rule absolute inset-x-0 bottom-0 origin-left border-b transition-transform group-last/item:hidden motion-reduce:delay-0 ${
                    isOpen
                      ? "scale-x-100 delay-(--stagger) duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      : "scale-x-0 duration-150"
                  }`}
                />
              </HashLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
