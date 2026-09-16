import type { CaseStudy } from "@/content/case-studies";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SiteContainer } from "@/shared/site-container";

export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="border-b-[1.5px] border-ink" aria-labelledby="case-study-title">
      <SiteContainer className="animate-fu py-[2.125rem] md:py-[4.5rem]">
        <p className="font-mono text-[0.625rem] font-bold tracking-[0.18em] text-muted">{caseStudy.eyebrow}</p>
        <h1
          id="case-study-title"
          className="mt-3 font-display text-[clamp(4rem,22vw,5.5rem)] leading-[0.8] font-black tracking-[-0.065em] md:text-[clamp(4.5rem,8.7vw,7.75rem)] md:leading-[0.82]"
        >
          {caseStudy.title}
        </h1>
        <p className="mt-7 max-w-[52rem] text-[1.125rem] leading-[1.45] font-semibold text-copy md:mt-10 md:text-[clamp(1.25rem,1.8vw,1.625rem)] md:leading-[1.38]">
          {caseStudy.deck}
        </p>
        <dl className="mt-8 grid grid-cols-2 border-t-[1.5px] border-ink md:mt-12 md:grid-cols-4">
          {caseStudy.metadata.map((item) => (
            <div key={item.label} className="border-b border-rule py-4 pr-4 md:border-b-0 md:border-r md:pl-5 md:first:pl-0 md:last:border-r-0">
              <dt className="font-mono text-[0.5625rem] font-bold tracking-[0.16em] text-muted">{item.label}</dt>
              <dd className="mt-1.5 text-[0.8125rem] font-semibold text-ink">
                <ResponsiveCopy long={item.value} short={item.valueShort} />
              </dd>
            </div>
          ))}
        </dl>
      </SiteContainer>
    </section>
  );
}
