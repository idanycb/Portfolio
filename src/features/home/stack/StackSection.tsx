import { SiteContainer } from "@/shared/site-container";

import { stackItems } from "./data";

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-16">
      <SiteContainer className="py-16">
        <header>
          <div className="flex flex-wrap items-end justify-between gap-4"><div className="flex items-baseline gap-4"><span className="font-mono text-xs font-bold tracking-[0.1em] text-ink-muted">§3</span><h2 className="font-display text-4xl leading-[0.9] font-black tracking-[-0.05em] uppercase sm:text-5xl">The stack</h2></div><p className="pb-1 font-mono text-[0.625rem] tracking-[0.16em] text-ink-muted uppercase">Four tiers / ordered by production depth</p></div>
          <svg aria-hidden viewBox="0 0 1144 22" preserveAspectRatio="none" className="ink-sketch mt-4 h-[22px] w-full fill-none stroke-ink" strokeLinecap="round"><path d="M3 8 C240 3,560 12,830 7 C970 4,1060 6,1141 9" strokeWidth="2.4" /><path d="M40 10 L38 20 M180 11 L178 21 M320 12 L318 22 M460 11 L458 21 M600 10 L598 20 M740 9 L738 19 M880 8 L878 18 M1020 8 L1018 18" strokeWidth="1.4" /></svg>
        </header>
        <div className="mt-3">
          {stackItems.map(([label, value], index) => <div key={label} className="grid gap-4 border-b border-rule py-7 last:border-b-0 sm:grid-cols-[3.25rem_1fr] md:grid-cols-[3.25rem_15rem_1fr] md:items-center md:gap-7"><span className="relative flex size-12 items-center justify-center font-mono text-xs font-bold"><svg aria-hidden viewBox="0 0 46 46" className="ink-sketch absolute inset-0 size-12 fill-none stroke-ink" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7 C17 4,31 4,40 7 C42 17,42 30,40 39 C29 42,15 42,6 39 C4 29,4 17,6 7 Z" /></svg>0{index + 1}</span><h3 className="font-display text-2xl font-extrabold tracking-[-0.035em]">{label}</h3><p className="font-mono text-xs leading-7 tracking-[0.08em] text-ink-soft uppercase sm:col-start-2 md:col-start-auto">{value}</p></div>)}
        </div>
        <div className="relative mt-7 pl-24" aria-hidden="true"><svg viewBox="0 0 82 66" className="ink-sketch absolute top-0 left-0 h-16 w-20 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M74 52 C52 54,28 40,12 14" /><path d="M11 30 C11 23,11 17,11 13 C16 15,22 17,28 19" /></svg><p className="font-annotation text-lg leading-6">Ordered by how much I have actually run in production.</p></div>
      </SiteContainer>
    </section>
  );
}
