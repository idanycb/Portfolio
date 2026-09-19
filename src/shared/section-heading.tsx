import type { ElementType } from "react";

import { ResponsiveCopy } from "./responsive-copy";

export type SectionHeadingProps = {
  number?: string;
  title: string;
  titleShort?: string;
  meta?: string;
  metaShort?: string;
  id?: string;
  level?: 2 | 3;
  inverse?: boolean;
  /** Use the one-step-smaller title scale the exports give two-line headings. */
  compact?: boolean;
  className?: string;
};

export function SectionHeading({
  number,
  title,
  titleShort,
  meta,
  metaShort,
  id,
  level = 2,
  inverse = false,
  compact = false,
  className = "",
}: SectionHeadingProps) {
  const Heading = `h${level}` as ElementType;

  return (
    <header className={className}>
      <div className="flex items-baseline gap-3">
        {number ? (
          <span
            className={`font-mono text-xs font-bold tracking-[0.1em] layout:text-[0.8125rem] ${inverse ? "text-inverse-muted" : "text-muted"}`}
          >
            {number}
          </span>
        ) : null}
        <ResponsiveCopy
          as={Heading}
          id={id}
          long={title}
          short={titleShort}
          className={`scroll-mt-28 whitespace-pre-line font-display font-black ${level === 2 ? (compact ? "text-section-title-compact" : "text-section-title") : "text-case-section"} ${inverse ? "text-paper" : "text-ink"}`}
        />
      </div>
      {meta ? (
        <ResponsiveCopy
          as="p"
          long={meta}
          short={metaShort}
          className={`mt-3 font-mono text-xs tracking-[0.16em] ${inverse ? "text-inverse-muted" : "text-muted"}`}
        />
      ) : null}
    </header>
  );
}
