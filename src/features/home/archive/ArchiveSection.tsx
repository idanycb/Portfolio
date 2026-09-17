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
      className="border-ink bg-ink-dark text-paper scroll-mt-32 border-b-[1.6px] py-11 pb-12 md:py-[88px] md:pb-24"
    >
      <SiteContainer>
        <SectionHeading
          number="§4"
          title={content.heading}
          meta={content.meta}
          inverse
          className="md:flex md:items-end md:justify-between"
        />
        <HomeSectionUnderline kind="archive" className="text-paper mt-3 md:mt-4" />
        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-9 md:grid-cols-4 md:gap-6">
          {content.projects.map((project, index) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-signature border-inverse-subtle hover:bg-ink-soft relative flex min-h-33 flex-col p-4 transition-colors md:min-h-[11.375rem] md:border-0 md:p-5"
            >
              <ArchiveOutline index={index} />
              <span className="text-inverse-subtle font-mono text-[0.59375rem] tracking-[0.18em]">
                {project.year}
              </span>
              <ResponsiveCopy
                as="h3"
                long={project.title}
                short={project.titleShort}
                className="font-display text-paper mt-3 text-[1.25rem] leading-[1.05] font-black tracking-[-0.04em] whitespace-pre-line md:text-[1.4375rem]"
              />
              <ResponsiveCopy
                long={project.stack}
                short={project.stackShort}
                className="text-inverse-muted mt-auto pt-5 font-mono text-[0.5625rem] leading-[1.8] tracking-[0.1em]"
              />
            </a>
          ))}
        </div>
        <p
          data-note=""
          className="ink-note font-hand text-inverse-muted mt-5 [transform:rotate(-.5deg)] text-[17px] leading-[1.3] md:mt-[26px] md:[transform:rotate(-.6deg)] md:text-lg"
        >
          {content.note}
        </p>
      </SiteContainer>
    </section>
  );
}
