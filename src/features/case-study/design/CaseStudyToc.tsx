"use client";

import { useEffect, useId, useRef, useState } from "react";

import { HashLink } from "@/shared/hash-link";
import { ResponsiveCopy } from "@/shared/responsive-copy";

type TocItem = { href: string; label: string; labelShort?: string };

export function CaseStudyToc({
  items,
  label,
  labelShort,
  openLabel,
  closeLabel,
  navLabel,
}: {
  items: readonly TocItem[];
  label: string;
  labelShort: string;
  openLabel: string;
  closeLabel: string;
  navLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const panelId = `case-study-toc-${generatedId.replace(/:/g, "")}`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    // The panel is still expanding; keep focus from scrolling its clipped box.
    firstLinkRef.current?.focus({ preventScroll: true });

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeFromLink = () => setOpen(false);

  return (
    <div className="border-ink bg-band layout:hidden border-b-signature">
      <div className="tablet:px-8 flex min-h-14 items-center justify-between gap-4 px-5">
        <ResponsiveCopy
          long={label}
          short={labelShort}
          className="text-muted layout:text-[0.625rem] font-mono text-[0.59375rem] tracking-[0.18em]"
        />
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? closeLabel : openLabel}
          className="layout:text-[0.71875rem] flex min-h-11 min-w-11 items-center justify-end font-mono text-[0.6875rem] font-bold tracking-[0.12em]"
        >
          {open ? "HIDE ✕" : "SHOW ▾"}
        </button>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <nav
          id={panelId}
          aria-label={navLabel}
          inert={!open}
          className={`min-h-0 overflow-hidden transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        >
          <div className="border-rule tablet:px-8 border-t px-5 py-4">
            <ol
              className="grid grid-flow-col grid-cols-2 gap-x-5 gap-y-1"
              style={{
                gridTemplateRows: `repeat(${Math.ceil(items.length / 2)}, auto)`,
              }}
            >
              {items.map((item, index) => (
                <li key={item.href}>
                  <HashLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={closeFromLink}
                    className="text-ink flex min-h-11 items-center gap-2 font-mono text-xs font-bold tracking-[0.08em]"
                  >
                    <span className="text-muted">{index + 1}</span>
                    <ResponsiveCopy long={item.label} short={item.labelShort} />
                  </HashLink>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    </div>
  );
}
