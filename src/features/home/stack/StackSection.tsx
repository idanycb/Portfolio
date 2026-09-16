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
        <ol className="border-ink mt-7 border-t-[1.6px] md:mt-9">
          {content.tiers.map((tier) => (
            <li
              key={tier.number}
              className="border-rule grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-2 border-b py-5 last:border-b-0 md:grid-cols-[3.25rem_16.25rem_1fr] md:items-center md:gap-7 md:py-7"
            >
              <span className="text-ink font-mono text-xs font-bold tracking-[0.04em]">
                {tier.number}
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
      </SiteContainer>
    </section>
  );
}
