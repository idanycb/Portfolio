import { HomeSectionUnderline, WorkDivider } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

import { WorkCard } from "./WorkCard";

type SelectedWorkSectionProps = { content: HomepageContent["work"] };

export function SelectedWorkSection({ content }: SelectedWorkSectionProps) {
  return (
    <section
      id="work"
      className="border-ink scroll-mt-32 border-b-[1.6px] py-11 pb-12 layout:py-20 layout:pb-24"
    >
      <SiteContainer>
        <SectionHeading
          number="§1"
          title={content.heading}
          titleShort={content.headingShort}
          meta={content.meta}
        />
        <HomeSectionUnderline kind="work" className="mt-3 layout:mt-4" />
        {/* The desktop export frames both cards in one hand-drawn rounded box
            (a 1.8px border run through the #ink filter). There is no frame in
            the mobile export, so it only appears from the layout breakpoint. */}
        <div className="relative mt-6 layout:mt-10 layout:px-9 layout:pt-9 layout:pb-11">
          <span
            aria-hidden
            className="ink border-ink pointer-events-none absolute inset-0 hidden rounded-[4px] border-[1.8px] layout:block"
          />
          <div className="relative">
            {content.projects.map((project, index) => (
              <div key={project.slug}>
                <WorkCard
                  project={project}
                  index={index}
                  note={index === 0 ? content.notes.findoc : content.notes.gitops}
                />
                {index === 0 ? <WorkDivider /> : null}
              </div>
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
