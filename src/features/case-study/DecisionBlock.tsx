import type { ReactNode } from "react";

export function DecisionBlock({ number, title, children, note }: { number: string; title: string; children: ReactNode; note?: string }) {
  return <div className="grid gap-4 sm:grid-cols-[4.5rem_1fr]"><svg viewBox="0 0 66 66" className="ink-sketch h-16 w-16" aria-hidden="true"><circle cx="33" cy="33" r="26" fill="none" stroke="currentColor" strokeWidth="1.8" /><text x="33" y="41" textAnchor="middle" className="fill-current font-mono text-[19px] font-bold">{number}</text></svg><div><h3 className="font-display text-xl leading-7 font-extrabold tracking-[-0.025em]">{title}</h3><div className="mt-2 prose-editorial">{children}</div>{note ? <p className="mt-3 font-annotation text-lg leading-5 text-ink-muted">{note}</p> : null}</div></div>;
}
