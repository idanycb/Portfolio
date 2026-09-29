import { HomeSectionUnderline, StackMarker, StackNoteArrow } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

type StackSectionProps = { content: HomepageContent["stack"] };

export function StackSection({ content }: StackSectionProps) {
  return (
    <section
      id="stack"
      className="border-ink tablet:py-16 layout:py-24 border-b-signature scroll-mt-32 py-11 pb-12"
    >
      <SiteContainer>
        <SectionHeading
          number="§3"
          title={content.heading}
          meta={content.meta}
          className="layout:flex layout:items-end layout:justify-between"
        />
        <HomeSectionUnderline kind="stack" className="layout:mt-4 mt-3" />
        <ol className="layout:mt-3 mt-2">
          {content.tiers.map((tier, index) => (
            <li
              key={tier.number}
              className="border-rule tablet:grid-cols-[2.75rem_13.5rem_1fr] tablet:items-center tablet:gap-6 layout:grid-cols-[3.25rem_16.25rem_1fr] layout:gap-7 layout:py-7 grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-2 border-b py-5 last:border-b-0"
            >
              <span className="text-ink layout:h-[46px] layout:w-[46px] relative flex h-[42px] w-[42px] items-center justify-center font-mono text-xs font-bold tracking-[0.04em]">
                <StackMarker index={index} />
                <span className="relative">{tier.number}</span>
              </span>
              <h3 className="font-display text-ink layout:text-[1.625rem] text-[1.375rem] leading-none font-extrabold tracking-[-0.035em]">
                {tier.label}
              </h3>
              <ResponsiveCopy
                long={tier.body}
                short={tier.bodyShort}
                at="tablet"
                className="text-copy tablet:col-span-1 layout:text-sm layout:leading-[1.9] layout:tracking-[0.09em] col-span-2 font-mono text-[0.78125rem] leading-[1.8] tracking-[0.07em]"
              />
            </li>
          ))}
        </ol>
        <div data-note="" className="ink-note layout:mt-[26px] layout:pl-24 relative mt-4">
          <StackNoteArrow className="layout:block absolute -top-1.5 left-0 hidden" />
          <ResponsiveCopy
            long={content.note}
            short={content.noteShort}
            className="font-hand layout:text-[19px] layout:leading-[1.35] text-lg leading-[1.3]"
          />
        </div>
      </SiteContainer>
    </section>
  );
}
