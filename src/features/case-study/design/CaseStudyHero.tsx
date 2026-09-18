import { CaseHeroDocument } from "@/components/svg/CaseStudyDrawings";
import type { CaseStudy } from "@/content/case-studies";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SiteContainer } from "@/shared/site-container";

export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section
      className="border-ink relative overflow-hidden border-b-[1.5px]"
      aria-labelledby="case-study-title"
    >
      <CaseHeroDocument />
      <SiteContainer className="animate-fu py-[2.125rem] layout:py-[4.5rem]">
        <p className="text-muted font-mono text-xs font-bold tracking-[0.18em]">
          {caseStudy.eyebrow}
        </p>
        <h1
          id="case-study-title"
          className="font-display mt-3 text-[clamp(4rem,22vw,5.5rem)] leading-[0.8] font-black tracking-[-0.065em] layout:text-[clamp(4.5rem,8.7vw,7.75rem)] layout:leading-[0.82]"
        >
          {caseStudy.title}
        </h1>
        <p className="text-copy mt-7 max-w-[43rem] text-[clamp(0.9375rem,4.8vw,1.125rem)] leading-[1.45] font-semibold text-pretty layout:mt-10 layout:max-w-[52rem] layout:text-[clamp(1.25rem,1.8vw,1.625rem)] layout:leading-[1.38]">
          {caseStudy.deck}
        </p>
        <dl className="border-ink mt-8 grid grid-cols-2 border-t-[1.5px] layout:mt-12 layout:grid-cols-4">
          {caseStudy.metadata.map((item) => (
            <div
              key={item.label}
              className="border-rule border-b py-4 pr-4 layout:border-r layout:border-b-0 layout:pl-5 layout:first:pl-0 layout:last:border-r-0"
            >
              <dt className="text-muted font-mono text-xs font-bold tracking-[0.16em]">
                {item.label}
              </dt>
              <dd className="text-ink mt-1.5 text-[0.8125rem] font-semibold">
                <ResponsiveCopy long={item.value} short={item.valueShort} />
              </dd>
            </div>
          ))}
        </dl>
      </SiteContainer>
    </section>
  );
}
