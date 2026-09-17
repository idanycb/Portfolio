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
      className="border-ink scroll-mt-32 border-b-[1.6px] py-11 pb-12 md:py-20 md:pb-24"
    >
      <SiteContainer>
        <SectionHeading
          number="§1"
          title={content.heading}
          titleShort={content.headingShort}
          meta={content.meta}
        />
        <HomeSectionUnderline kind="work" className="mt-3 md:mt-4" />
        <div className="mt-6 md:mt-10">
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
      </SiteContainer>
    </section>
  );
}
