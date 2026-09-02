import { SiteContainer } from "@/shared/site-container";

import { archiveProjects } from "./data";

export function ArchiveSection() {
  return (
    <section className="border-t-[1.5px] border-ink bg-inverse text-paper">
      <SiteContainer className="py-16">
        <header><div className="flex flex-wrap items-end justify-between gap-4"><div className="flex items-baseline gap-4"><span className="font-mono text-xs font-bold tracking-[0.1em] text-[#9d978e]">§4</span><h2 className="font-display text-4xl leading-[0.9] font-black tracking-[-0.05em] uppercase sm:text-5xl">The archive</h2></div><p className="pb-1 font-mono text-[0.625rem] tracking-[0.16em] text-[#9d978e] uppercase">2021-2023 / student work, kept honestly</p></div><div aria-hidden className="mt-5 border-t-2 border-dashed border-paper/80" /></header>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{archiveProjects.map((project) => <a key={project.title} href={project.href} target="_blank" rel="noreferrer" className="group relative min-h-44 p-6 text-paper transition-colors duration-150 hover:bg-white/5"><span aria-hidden className="ink-sketch pointer-events-none absolute inset-0 rounded-[4px] border border-[#6f6a63]" /><span className="relative block font-mono text-[0.6rem] tracking-[0.18em] text-[#6f6a63]">{project.year}</span><h3 className="relative mt-3 min-h-12 font-display text-2xl leading-[1.05] font-black tracking-[-0.035em] uppercase">{project.title}</h3><span className="relative mt-4 block font-mono text-[0.625rem] leading-5 tracking-[0.09em] text-[#9d978e] uppercase">{project.stack} ↗</span></a>)}</div>
        <p className="mt-6 font-annotation text-lg leading-6 text-[#9d978e] -rotate-1">Kept because they show the road, not the destination.</p>
      </SiteContainer>
    </section>
  );
}
