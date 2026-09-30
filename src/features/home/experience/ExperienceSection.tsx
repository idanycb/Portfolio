import {
  ExperienceIcon,
  ExperienceNoteCircle,
  HomeSectionUnderline,
} from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

type ExperienceSectionProps = { content: HomepageContent["experience"] };

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="border-ink bg-band tablet:py-16 layout:py-20 layout:pb-24 border-b-signature scroll-mt-32 py-11 pb-12"
    >
      <SiteContainer>
        <SectionHeading
          compact
          number="§2"
          title={content.heading}
          titleShort={content.headingShort}
          meta={content.range}
        />
        <HomeSectionUnderline kind="experience" className="layout:mt-4 mt-3" />
        {/* The exports draw this as a timeline: one dashed spine with dots on
            mobile, per-item dashed connectors beside the icons on desktop.
            Tablet keeps the spine and dots, with the dates in their own column.
            Neither export puts a rule between entries. */}
        <div className="tablet:mt-10 tablet:pl-0 layout:mt-[50px] relative mt-[30px] pl-[34px]">
          <span
            aria-hidden
            className="border-connector layout:hidden tablet:left-[calc(11rem_+_19px)] border-l-signature absolute top-[10px] bottom-[10px] left-[9px] border-dashed"
          />
          <ol>
            {content.items.map((item, index) => {
              const isWork = index === 0;
              const isLast = index === content.items.length - 1;
              return (
                <li
                  key={item.organization}
                  className="tablet:grid tablet:grid-cols-[11rem_1fr] tablet:items-start tablet:gap-x-10 layout:grid-cols-[150px_132px_1fr] layout:gap-0 layout:pb-[54px] relative pb-[34px]"
                >
                  <span
                    aria-hidden
                    className="border-ink bg-band layout:hidden tablet:left-[calc(11rem_+_14px)] tablet:top-[10px] border-signature absolute top-[6px] -left-[30px] h-[11px] w-[11px] rounded-full"
                  />
                  {!isLast ? (
                    <span
                      aria-hidden
                      className="border-connector layout:block border-l-signature absolute top-[120px] bottom-[6px] left-[215px] hidden border-dashed"
                    />
                  ) : null}

                  <div className="tablet:col-start-1 tablet:row-start-1 tablet:pt-2 tablet:text-right layout:pt-[22px] layout:pr-7">
                    <div className="text-ink layout:text-xs font-mono text-[0.6875rem] font-bold tracking-[0.13em]">
                      <ResponsiveCopy long={item.dates} short={item.datesShort} at="tablet" />
                    </div>
                    {item.meta ? (
                      <ResponsiveCopy
                        long={item.meta}
                        short={item.metaShort}
                        className="text-muted tablet:block mt-[5px] hidden font-mono text-[0.65625rem] tracking-[0.13em]"
                      />
                    ) : null}
                  </div>

                  <div className="layout:col-start-2 layout:row-start-1 layout:row-span-2 layout:flex layout:justify-center layout:pt-2 hidden">
                    <ExperienceIcon index={index} />
                  </div>

                  <div className="tablet:col-start-2 tablet:row-start-1 tablet:row-span-2 layout:col-start-3 layout:pt-3.5 layout:pl-3 min-w-0">
                    {/* The exports put the work role beside the org name on one
                        baseline row; education roles sit on their own line below. */}
                    <div
                      className={`tablet:mt-0 layout:gap-x-4 mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${
                        isWork ? "" : "layout:flex-col layout:items-start flex-col items-start"
                      }`}
                    >
                      <h3
                        className={`font-display text-ink font-black text-balance ${
                          isWork
                            ? "layout:text-[2.375rem] text-[1.875rem] leading-[1] tracking-[-0.045em]"
                            : "layout:max-w-[37.5rem] layout:text-[1.875rem] layout:leading-[1.06] layout:tracking-[-0.045em] text-[1.375rem] leading-[1.1] tracking-[-0.04em]"
                        }`}
                      >
                        {item.organization}
                      </h3>
                      <ResponsiveCopy
                        long={item.role}
                        short={item.roleShort}
                        className={`text-copy-muted font-mono font-bold ${
                          isWork
                            ? "layout:text-xs text-[0.65625rem] tracking-[0.13em]"
                            : "layout:mt-3 layout:text-[0.8125rem] mt-1 text-[0.71875rem] tracking-[0.12em]"
                        }`}
                      />
                    </div>
                    {item.body ? (
                      <ResponsiveCopy
                        as="p"
                        long={item.body}
                        short={item.bodyShort}
                        className={`layout:mt-3 mt-2.5 text-[0.90625rem] leading-[1.6] text-pretty ${
                          isWork
                            ? "text-copy layout:text-[0.96875rem] layout:leading-[1.68] max-w-[37.5rem]"
                            : "text-copy-muted layout:text-[0.9375rem] layout:leading-[1.65] max-w-[35rem]"
                        }`}
                      />
                    ) : null}
                    {item.stack ? (
                      <p className="text-muted layout:mt-3.5 mt-3 font-mono text-[0.65625rem] leading-[2] tracking-[0.13em]">
                        {item.stack}
                      </p>
                    ) : null}
                  </div>

                  {isWork ? (
                    <p
                      data-note=""
                      className="ink-note font-hand tablet:block text-copy-muted tablet:col-start-1 tablet:row-start-2 tablet:mt-3 tablet:text-right tablet:leading-[1.2] layout:pr-7 mt-2.5 hidden text-[17px] leading-[1.25]"
                    >
                      <span className="relative mr-4 inline-block max-w-[7.5rem]">
                        {content.note}
                        <ExperienceNoteCircle className="text-ink -top-[14px] -left-[20px] h-[calc(100%+28px)] w-[calc(100%+46px)]" />
                      </span>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
        <div className="border-rule tablet:grid tablet:grid-cols-[11rem_1fr] tablet:gap-10 layout:mt-11 layout:grid-cols-[150px_1fr] layout:gap-7 layout:pt-4 mt-8 border-t pt-3.5">
          <p className="text-muted layout:text-[0.625rem] layout:tracking-[0.16em] font-mono text-[0.59375rem] tracking-[0.2em]">
            CERTIFICATIONS
          </p>
          <p className="text-copy-muted tablet:mt-0 mt-2 font-mono text-[0.6875rem] leading-[1.95] tracking-[0.08em]">
            {content.certifications}
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
