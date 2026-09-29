import { ArchiveOutline, HomeSectionUnderline } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

type ArchiveSectionProps = { content: HomepageContent["archive"] };

export function ArchiveSection({ content }: ArchiveSectionProps) {
  return (
    <section
      id="archive"
      className="border-ink bg-ink-dark text-paper layout:py-[88px] layout:pb-24 border-b-signature scroll-mt-32 py-11 pb-12"
    >
      <SiteContainer className="archive-shell">
        <SectionHeading
          number="§4"
          title={content.heading}
          meta={content.meta}
          inverse
          className="layout:flex layout:items-end layout:justify-between"
        />
        <HomeSectionUnderline kind="archive" className="text-paper layout:mt-4 mt-3" />
        <div className="archive-grid layout:mt-[34px] mt-[26px] grid grid-cols-2 gap-3.5">
          {content.projects.map((project, index) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="archive-card text-paper border-inverse-subtle hover:bg-ink-soft border-signature relative flex min-h-[132px] flex-col px-3.5 pt-4 pb-[18px] transition-colors"
            >
              <ArchiveOutline index={index} />
              <span className="text-inverse-subtle layout:text-[0.59375rem] font-mono text-[0.5625rem] tracking-[0.18em]">
                {project.year}
              </span>
              <ResponsiveCopy
                as="h3"
                long={project.title}
                short={project.titleShort}
                className="font-display text-paper layout:text-[1.4375rem] mt-2.5 text-[1.1875rem] leading-[1.05] font-black tracking-[-0.035em] whitespace-pre-line"
              />
              <ResponsiveCopy
                long={project.stack}
                short={project.stackShort}
                className="text-inverse-muted layout:pt-4 layout:text-[0.625rem] layout:leading-[1.8] mt-auto pt-3 font-mono text-[0.5625rem] leading-[1.7] tracking-[0.1em]"
              />
            </a>
          ))}
        </div>
        <p
          data-note=""
          className="ink-note font-hand text-inverse-muted layout:mt-[26px] layout:[transform:rotate(-.6deg)] layout:text-lg mt-5 [transform:rotate(-.5deg)] text-[17px] leading-[1.3]"
        >
          {content.note}
        </p>
      </SiteContainer>
    </section>
  );
}
