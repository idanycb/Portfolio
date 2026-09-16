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
        <div className="border-ink mt-8 border-t-[1.6px] md:mt-10">
          {content.projects.map((project, index) => (
            <WorkCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
