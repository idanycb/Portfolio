import type { ReactNode } from "react";

export function CaseStudyNotes({ children }: { children: ReactNode }) {
  return <aside className="mt-12 border-t-2 border-ink pt-4" aria-label="Case study notes"><p className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-muted uppercase">Notes</p><div className="mt-3 font-mono text-xs leading-6 tracking-[0.04em] text-ink-soft">{children}</div></aside>;
}
