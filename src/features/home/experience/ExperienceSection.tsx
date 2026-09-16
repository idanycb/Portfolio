import type { HomepageContent } from "@/content/home";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

type ExperienceSectionProps = { content: HomepageContent["experience"] };

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="border-ink bg-band scroll-mt-32 border-b-[1.6px] py-11 pb-12 md:py-20 md:pb-24"
    >
      <SiteContainer>
        <SectionHeading
          number="§2"
          title={content.heading}
          titleShort={content.headingShort}
          meta={content.range}
        />
        <ol className="border-rule mt-8 border-t md:mt-10">
          {content.items.map((item) => (
            <li
              key={item.organization}
              className="border-rule grid gap-3 border-b py-6 md:grid-cols-[11rem_1fr] md:gap-8 md:py-9"
            >
              <div className="text-ink font-mono text-[0.65625rem] leading-[1.65] font-bold tracking-[0.13em]">
                <ResponsiveCopy long={item.dates} short={item.datesShort} />
                {item.meta ? (
                  <ResponsiveCopy
                    long={item.meta}
                    short={item.metaShort}
                    className="text-muted mt-1 hidden md:block"
                  />
                ) : null}
              </div>
              <div>
                <h3 className="font-display text-ink max-w-3xl text-[clamp(1.375rem,2.4vw,2.375rem)] leading-[1.04] font-black tracking-[-0.045em]">
                  {item.organization}
                </h3>
                <ResponsiveCopy
                  long={item.role}
                  short={item.roleShort}
                  className="text-copy-muted mt-2 font-mono text-[0.65625rem] font-bold tracking-[0.13em]"
                />
                {item.body ? (
                  <ResponsiveCopy
                    long={item.body}
                    short={item.bodyShort}
                    className="text-copy mt-3 max-w-3xl text-[0.90625rem] leading-[1.6]"
                  />
                ) : null}
                {item.stack ? (
                  <p className="text-muted mt-3 font-mono text-[0.59375rem] leading-[1.8] tracking-[0.1em]">
                    {item.stack}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        <div className="border-rule mt-8 border-t pt-4 md:mt-11 md:grid md:grid-cols-[11rem_1fr] md:gap-8">
          <p className="text-muted font-mono text-[0.625rem] tracking-[0.18em]">CERTIFICATIONS</p>
          <p className="text-copy-muted mt-3 font-mono text-[0.6875rem] leading-[1.9] tracking-[0.09em] md:mt-0">
            {content.certifications}
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
