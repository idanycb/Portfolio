import { CaseHeroDocument } from "@/components/svg/CaseStudyDrawings";
import type { CaseStudy } from "@/content/case-studies";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SiteContainer } from "@/shared/site-container";

export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section
      className="border-ink border-b-signature relative overflow-hidden"
      aria-labelledby="case-study-title"
    >
      <CaseHeroDocument />
      <SiteContainer className="animate-fu tablet:py-14 layout:py-[4.5rem] py-[2.125rem]">
        <p className="text-muted layout:text-[0.625rem] font-mono text-[0.59375rem] tracking-[0.22em]">
          {caseStudy.eyebrow}
        </p>
        <h1
          id="case-study-title"
          className={`font-display tablet:text-[clamp(5.5rem,10vw,6rem)] layout:text-[clamp(4.5rem,10vw,7.75rem)] layout:leading-[0.86] layout:tracking-[-0.062em] mt-3 leading-[0.88] font-black tracking-[-0.06em] ${caseStudy.titleSize === "compact" ? "text-[clamp(2.75rem,14.5vw,4.75rem)]" : "text-[clamp(4rem,19vw,5.5rem)]"}`}
        >
          {caseStudy.title}
        </h1>
        <p className="text-copy tablet:text-[1.1875rem] layout:mt-10 layout:max-w-[52rem] layout:text-[clamp(1.25rem,1.8vw,1.625rem)] layout:leading-[1.38] mt-7 max-w-[43rem] text-[clamp(0.9375rem,4.8vw,1.125rem)] leading-[1.45] font-semibold text-pretty">
          {caseStudy.deck}
        </p>
        <dl className="border-ink tablet:grid-cols-4 layout:mt-12 border-t-signature mt-8 grid grid-cols-2">
          {caseStudy.metadata.map((item) => (
            <div
              key={item.label}
              className="border-rule tablet:border-r tablet:border-b-0 tablet:pl-5 tablet:first:pl-0 tablet:last:border-r-0 border-b py-4 pr-4"
            >
              <dt className="text-muted layout:text-[0.59375rem] font-mono text-[0.5625rem] tracking-[0.18em]">
                {item.label}
              </dt>
              <dd className="text-ink layout:text-[0.9375rem] mt-1.5 text-sm font-bold">
                <ResponsiveCopy long={item.value} short={item.valueShort} />
              </dd>
            </div>
          ))}
        </dl>
      </SiteContainer>
    </section>
  );
}
