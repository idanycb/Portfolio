import { FadeIn } from "@/components/animation/FadeIn";
import { Container } from "@/components/ui";
import { skills } from "./data/skills";
import { SkillSetCard } from "./SkillSetCard";

export function SkillsGallery() {
  return (
    <section id="skills">
      <Container>
        <FadeIn scrollTrigger from="left">
          <h1 className="my-16 text-4xl font-medium md:self-center md:text-5xl lg:text-6xl">
            Skills
          </h1>
        </FadeIn>
        <div className="columns-1 gap-3 md:columns-2 lg:flex">
          {/* {skills.map((skillsGrouped, i) =>
        skillsGrouped.map((skillSection) => (
          <SkillSetCard
            className="mb-2 break-inside-avoid"
            key={skillSection.section}
            skillSection={skillSection}
          />
        )),
      )} */}
          {skills.map((skillsGrouped, i) => (
            <div key={i} className="md:mb-2">
              {skillsGrouped.map((skillSection) => (
                <FadeIn scrollTrigger from="top" key={skillSection.section}>
                  <SkillSetCard className="mb-2 break-inside-avoid" skillSection={skillSection} />
                </FadeIn>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
