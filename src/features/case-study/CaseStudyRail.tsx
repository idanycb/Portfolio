import type { ReactNode } from "react";

export type CaseStudyRailItem = { href: string; label: string };

export function CaseStudyRail({ items, annotation }: { items: readonly CaseStudyRailItem[]; annotation?: ReactNode }) {
  return (
    <aside className="border-b border-rule bg-[#efece5] px-5 py-6 lg:border-r lg:border-b-0 lg:px-8 lg:py-9" aria-label="On this page">
      <div className="lg:sticky lg:top-7">
        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-muted uppercase">On this page</p>
        <nav className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Case study sections">
          {items.map((item, index) => (
            <a key={item.href} href={item.href} className={`border-l-[2.5px] py-1 pl-3 font-mono text-[0.68rem] leading-4 tracking-[0.06em] uppercase transition-colors hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink ${index === 0 ? "border-ink text-ink" : "border-transparent text-ink-muted"}`}>
              {index + 1} {item.label}
            </a>
          ))}
        </nav>
        {annotation}
      </div>
    </aside>
  );
}
