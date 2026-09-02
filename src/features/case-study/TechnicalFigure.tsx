import type { CSSProperties, ReactNode } from "react";

export function TechnicalFigure({ number, caption, children }: { number: string; caption: string; children: ReactNode }) {
  return <figure className="my-7"><div className="overflow-x-auto border border-ink bg-[#fffdf9] p-5 sm:p-7">{children}</div><figcaption className="mt-2 flex justify-between gap-5 border-t border-ink pt-2 font-mono text-[0.6rem] tracking-[0.14em] text-ink-muted uppercase"><span>Fig. {number}</span><span className="text-right text-ink-soft">{caption}</span></figcaption></figure>;
}

export function SystemFlow({ steps }: { steps: readonly { title: string; detail: string }[] }) {
  return <ol className="grid min-w-[38rem] grid-cols-[repeat(var(--flow-count),minmax(7rem,1fr))] gap-3" style={{ "--flow-count": steps.length } as CSSProperties}>
    {steps.map((step, index) => <li key={step.title} className="relative border border-ink px-3 py-4"><strong className="block font-mono text-[0.67rem] tracking-[0.08em] uppercase">{index + 1}. {step.title}</strong><span className="mt-2 block font-serif text-sm leading-5 text-ink-soft">{step.detail}</span>{index < steps.length - 1 ? <svg viewBox="0 0 32 20" className="ink-sketch absolute top-1/2 right-[-1.55rem] z-10 hidden h-5 w-8 -translate-y-1/2 bg-[#fffdf9] sm:block" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 10 L28 10 M21 3 L29 10 L21 17" /></svg> : null}</li>)}
  </ol>;
}
