import { HomeSectionUnderline, WorkDivider, WorkFrame } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";

import { WorkCard } from "./WorkCard";

type SelectedWorkSectionProps = { content: HomepageContent["work"] };

export function SelectedWorkSection({ content }: SelectedWorkSectionProps) {
  return (
    <section
      id="work"
      className="border-ink tablet:py-16 layout:py-20 layout:pb-24 border-b-signature scroll-mt-32 py-11 pb-12"
    >
      <SiteContainer>
        {/* The desktop export frames both cards in one hand-drawn box. The
            frame has since been widened to take in the section heading, and is
            now four drawn strokes rather than a filtered CSS border. There is
            no frame in the mobile export, so it only appears from the tablet
            breakpoint. */}
        <div className="tablet:px-6 tablet:pt-6 tablet:pb-8 layout:px-9 layout:pt-9 layout:pb-11 relative">
          <WorkFrame className="text-ink tablet:block hidden" />
          <div className="relative">
            <SectionHeading
              number="§1"
              title={content.heading}
              titleShort={content.headingShort}
              meta={content.meta}
            />
            <HomeSectionUnderline kind="work" className="tablet:mt-4 mt-3" />
            <div className="tablet:mt-8 layout:mt-10 mt-6">
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
        </div>
      </SiteContainer>
    </section>
  );
}
