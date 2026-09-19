import { ExperienceIcon, HomeSectionUnderline } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

type ExperienceSectionProps = { content: HomepageContent["experience"] };

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="border-ink bg-band scroll-mt-32 border-b-[1.6px] py-11 pb-12 layout:py-20 layout:pb-24"
    >
      <SiteContainer>
        <SectionHeading
          compact
          number="§2"
          title={content.heading}
          titleShort={content.headingShort}
          meta={content.range}
        />
        <HomeSectionUnderline kind="experience" className="mt-3 layout:mt-4" />
        <ol className="mt-6 layout:mt-8">
          {content.items.map((item, index) => (
            <li
              key={item.organization}
              className="border-rule grid gap-3 border-b py-6 layout:grid-cols-[11rem_1fr] layout:gap-8 layout:py-9"
            >
              <div className="text-ink font-mono text-xs leading-[1.65] font-bold tracking-[0.13em] layout:text-[0.8125rem]">
                <ResponsiveCopy long={item.dates} short={item.datesShort} />
                {item.meta ? (
                  <ResponsiveCopy
                    long={item.meta}
                    short={item.metaShort}
                    className="text-muted mt-1 hidden font-normal layout:block"
                  />
                ) : null}
              </div>
              <div className="flex gap-5">
                <ExperienceIcon index={index} />
                <div className="min-w-0">
                  {/* The exports size the work entry larger than the education entries. */}
                  <h3
                    className={`font-display text-ink max-w-3xl text-balance font-black ${
                      index === 0
                        ? "text-[1.875rem] leading-[1] tracking-[-0.045em] layout:text-[2.375rem]"
                        : "text-[1.375rem] leading-[1.1] tracking-[-0.04em] layout:max-w-[37.5rem] layout:text-[1.875rem] layout:leading-[1.06] layout:tracking-[-0.045em]"
                    }`}
                  >
                    {item.organization}
                  </h3>
                  <ResponsiveCopy
                    long={item.role}
                    short={item.roleShort}
                    className="text-copy-muted mt-2 font-mono text-xs font-bold tracking-[0.13em] layout:text-[0.8125rem]"
                  />
                  {item.body ? (
                    <ResponsiveCopy
                      long={item.body}
                      short={item.bodyShort}
                      className={`mt-3 max-w-3xl text-[0.90625rem] leading-[1.6] ${
                        index === 0 ? "text-copy" : "text-copy-muted"
                      }`}
                    />
                  ) : null}
                  {item.stack ? (
                    <p className="text-muted mt-3 font-mono text-xs leading-[1.8] tracking-[0.1em]">
                      {item.stack}
                    </p>
                  ) : null}
                  {index === 0 ? (
                    <p
                      data-note=""
                      className="ink-note font-hand text-copy-muted mt-2.5 text-[17px] leading-[1.2]"
                    >
                      {content.note}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-rule mt-8 border-t pt-4 layout:mt-11 layout:grid layout:grid-cols-[11rem_1fr] layout:gap-8">
          <p className="text-muted font-mono text-xs tracking-[0.18em]">CERTIFICATIONS</p>
          <p className="text-copy-muted mt-3 font-mono text-xs leading-[1.9] tracking-[0.09em] layout:mt-0">
            {content.certifications}
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
