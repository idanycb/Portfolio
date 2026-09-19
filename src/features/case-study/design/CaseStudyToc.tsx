"use client";

import { useEffect, useId, useRef, useState } from "react";

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
    firstLinkRef.current?.focus();

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
    <div className="border-ink bg-band border-b-[1.5px] layout:hidden">
      <div className="flex min-h-14 items-center justify-between gap-4 px-5">
        <ResponsiveCopy
          long={label}
          short={labelShort}
          className="text-muted font-mono text-xs tracking-[0.18em]"
        />
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? closeLabel : openLabel}
          className="flex min-h-11 min-w-11 items-center justify-end font-mono text-xs font-bold tracking-[0.12em]"
        >
          {open ? "HIDE ✕" : "SHOW ▾"}
        </button>
      </div>
      <nav
        id={panelId}
        aria-label={navLabel}
        hidden={!open}
        className="border-rule border-t px-5 py-4"
      >
        <ol className="grid grid-cols-2 gap-x-5 gap-y-1">
          {items.map((item, index) => (
            <li key={item.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={closeFromLink}
                className="text-ink flex min-h-11 items-center gap-2 font-mono text-xs font-bold tracking-[0.08em]"
              >
                <span className="text-muted">{index + 1}</span>
                <ResponsiveCopy long={item.label} short={item.labelShort} />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
