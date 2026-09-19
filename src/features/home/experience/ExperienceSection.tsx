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
        {/* The exports draw this as a timeline: one dashed spine with dots on
            mobile, per-item dashed connectors beside the icons on desktop.
            Neither export puts a rule between entries. */}
        <div className="relative mt-[30px] pl-[34px] layout:mt-[50px] layout:pl-0">
          <span
            aria-hidden
            className="border-connector absolute top-[10px] bottom-[10px] left-[9px] border-l-[1.5px] border-dashed layout:hidden"
          />
          <ol>
            {content.items.map((item, index) => {
              const isWork = index === 0;
              const isLast = index === content.items.length - 1;
              return (
                <li
                  key={item.organization}
                  className="relative pb-[34px] layout:grid layout:grid-cols-[150px_132px_1fr] layout:items-start layout:gap-0 layout:pb-[54px]"
                >
                  <span
                    aria-hidden
                    className="border-ink bg-band absolute top-[6px] -left-[30px] h-[11px] w-[11px] rounded-full border-[1.6px] layout:hidden"
                  />
                  {!isLast ? (
                    <span
                      aria-hidden
                      className="border-connector absolute top-[120px] bottom-[6px] left-[215px] hidden border-l-[1.5px] border-dashed layout:block"
                    />
                  ) : null}

                  <div className="layout:col-start-1 layout:row-start-1 layout:pt-[22px] layout:pr-7 layout:text-right">
                    <div className="text-ink font-mono text-[0.6875rem] font-bold tracking-[0.13em] layout:text-xs">
                      <ResponsiveCopy long={item.dates} short={item.datesShort} />
                    </div>
                    {item.meta ? (
                      <ResponsiveCopy
                        long={item.meta}
                        short={item.metaShort}
                        className="text-muted mt-[5px] hidden font-mono text-[0.65625rem] tracking-[0.13em] layout:block"
                      />
                    ) : null}
                  </div>

                  <div className="hidden layout:col-start-2 layout:row-start-1 layout:row-span-2 layout:flex layout:justify-center layout:pt-2">
                    <ExperienceIcon index={index} />
                  </div>

                  <div className="min-w-0 layout:col-start-3 layout:row-start-1 layout:row-span-2 layout:pt-3.5 layout:pl-3">
                    {/* The exports put the work role beside the org name on one
                        baseline row; education roles sit on their own line below. */}
                    <div
                      className={`mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 layout:mt-0 layout:gap-x-4 ${
                        isWork ? "" : "flex-col items-start layout:flex-col layout:items-start"
                      }`}
                    >
                      <h3
                        className={`font-display text-ink text-balance font-black ${
                          isWork
                            ? "text-[1.875rem] leading-[1] tracking-[-0.045em] layout:text-[2.375rem]"
                            : "text-[1.375rem] leading-[1.1] tracking-[-0.04em] layout:max-w-[37.5rem] layout:text-[1.875rem] layout:leading-[1.06] layout:tracking-[-0.045em]"
                        }`}
                      >
                        {item.organization}
                      </h3>
                      <ResponsiveCopy
                        long={item.role}
                        short={item.roleShort}
                        className={`text-copy-muted font-mono font-bold ${
                          isWork
                            ? "text-[0.65625rem] tracking-[0.13em] layout:text-xs"
                            : "mt-1 text-[0.71875rem] tracking-[0.12em] layout:mt-3 layout:text-[0.8125rem]"
                        }`}
                      />
                    </div>
                    {item.body ? (
                      <ResponsiveCopy
                        as="p"
                        long={item.body}
                        short={item.bodyShort}
                        className={`mt-2.5 text-[0.90625rem] leading-[1.6] text-pretty layout:mt-3 ${
                          isWork
                            ? "text-copy max-w-[37.5rem] layout:text-[0.96875rem] layout:leading-[1.68]"
                            : "text-copy-muted max-w-[35rem] layout:text-[0.9375rem] layout:leading-[1.65]"
                        }`}
                      />
                    ) : null}
                    {item.stack ? (
                      <p className="text-muted mt-3 font-mono text-[0.65625rem] leading-[2] tracking-[0.13em] layout:mt-3.5">
                        {item.stack}
                      </p>
                    ) : null}
                  </div>

                  {isWork ? (
                    <p
                      data-note=""
                      className="ink-note font-hand text-copy-muted mt-2.5 text-[17px] leading-[1.25] layout:col-start-1 layout:row-start-2 layout:mt-3 layout:pr-7 layout:text-right layout:leading-[1.2]"
                    >
                      {content.note}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
        <div className="border-rule mt-8 border-t pt-3.5 layout:mt-11 layout:grid layout:grid-cols-[150px_1fr] layout:gap-7 layout:pt-4">
          <p className="text-muted font-mono text-[0.59375rem] tracking-[0.2em] layout:text-[0.625rem] layout:tracking-[0.16em]">CERTIFICATIONS</p>
          <p className="text-copy-muted mt-2 font-mono text-[0.6875rem] leading-[1.95] tracking-[0.08em] layout:mt-0">
            {content.certifications}
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
