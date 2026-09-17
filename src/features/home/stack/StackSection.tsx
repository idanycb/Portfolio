import { HomeSectionUnderline, StackMarker, StackNoteArrow } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

type StackSectionProps = { content: HomepageContent["stack"] };

export function StackSection({ content }: StackSectionProps) {
  return (
    <section id="stack" className="border-ink scroll-mt-32 border-b-[1.6px] py-11 pb-12 md:py-24">
      <SiteContainer>
        <SectionHeading
          number="§3"
          title={content.heading}
          meta={content.meta}
          className="md:flex md:items-end md:justify-between"
        />
        <HomeSectionUnderline kind="stack" className="mt-3 md:mt-4" />
        <ol className="mt-2 md:mt-3">
          {content.tiers.map((tier, index) => (
            <li
              key={tier.number}
              className="border-rule grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-2 border-b py-5 last:border-b-0 md:grid-cols-[3.25rem_16.25rem_1fr] md:items-center md:gap-7 md:py-7"
            >
              <span className="text-ink relative flex h-[42px] w-[42px] items-center justify-center font-mono text-xs font-bold tracking-[0.04em] md:h-[46px] md:w-[46px]">
                <StackMarker index={index} />
                <span className="relative">{tier.number}</span>
              </span>
              <h3 className="font-display text-ink text-[1.375rem] leading-none font-extrabold tracking-[-0.035em] md:text-[1.625rem]">
                {tier.label}
              </h3>
              <ResponsiveCopy
                long={tier.body}
                short={tier.bodyShort}
                className="text-copy col-span-2 font-mono text-[0.6875rem] leading-[1.85] tracking-[0.09em] md:col-span-1 md:text-sm"
              />
            </li>
          ))}
        </ol>
        <div data-note="" className="ink-note relative mt-4 md:mt-[26px] md:pl-24">
          <StackNoteArrow className="absolute -top-1.5 left-0 hidden md:block" />
          <ResponsiveCopy
            long={content.note}
            short={content.noteShort}
            className="font-hand text-lg leading-[1.3] md:text-[19px] md:leading-[1.35]"
          />
        </div>
      </SiteContainer>
    </section>
  );
}
