import type { ReactNode } from "react";

import { MetaList, type MetaListItem } from "@/shared/meta-list";
import { SiteContainer } from "@/shared/site-container";

export type CaseStudyHeroProps = {
  title: string;
  eyebrow: string;
  summary: string;
  metadata: readonly MetaListItem[];
  artwork?: ReactNode;
  underline?: ReactNode;
};

export function CaseStudyHero({ title, eyebrow, summary, metadata, artwork, underline }: CaseStudyHeroProps) {
  return (
    <section className="overflow-hidden border-b border-ink" aria-labelledby="case-study-title">
      <SiteContainer className="relative py-12 sm:py-16 lg:py-[4.5rem]">
        {artwork}
        <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted uppercase">{eyebrow}</p>
        <h1 id="case-study-title" className="relative mt-3 inline-block max-w-4xl font-display text-6xl leading-[0.86] font-black tracking-[-0.065em] uppercase sm:text-8xl lg:text-[7.75rem]">
          {title}
          {underline}
        </h1>
        <p className="mt-9 max-w-3xl text-pretty text-xl leading-8 font-semibold text-ink-soft sm:text-[1.75rem] sm:leading-9">{summary}</p>
        <MetaList items={metadata} className="mt-10" />
      </SiteContainer>
    </section>
  );
}
