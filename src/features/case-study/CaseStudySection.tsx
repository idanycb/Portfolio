import type { ReactNode } from "react";

export function CaseStudySection({ id, number, title, children, className = "" }: { id: string; number: string; title: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`scroll-mt-8 border-t border-rule pt-7 first:border-t-0 first:pt-0 ${className}`} aria-labelledby={`${id}-title`}>
    <header className="flex items-baseline gap-4"><span className="shrink-0 font-mono text-xs font-bold tracking-[0.1em] text-muted">§{number}</span><h2 id={`${id}-title`} className="font-display text-2xl leading-none font-black tracking-[-0.04em] uppercase sm:text-3xl">{title}</h2></header>
    <div className="mt-4">{children}</div>
  </section>;
}
