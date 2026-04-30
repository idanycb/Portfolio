import { FadeIn } from "@/components/animation/FadeIn";
import { Container } from "@/components/ui";
import { skills } from "./data/skills";
import { SkillSetCard } from "./SkillSetCard";

export function SkillsGallery() {
  return (
    <section id="skills" className="mb-12" aria-labelledby="skills-heading">
      <FadeIn
        scrollTrigger
        from="left"
        className="mt-6 mb-6 flex items-center justify-between px-3 pt-6 pb-1 md:mb-12 md:px-6 md:pt-12 xl:px-10"
      >
        <h2
          id="skills-heading"
          className="text-[40px] leading-[0.9] font-black -tracking-[0.06em] uppercase md:text-[clamp(36px,5vw,70px)]"
        >
          Skills
        </h2>
        <span className="mb-0.5 max-w-30 text-right text-[9px] leading-[1.3] font-bold text-[#4a4848] md:mb-1 md:text-[11px] md:leading-[1.2]">
          Stuff that I know how to do, and the tools I use to do it.
        </span>
      </FadeIn>
      <Container>
        <div className="columns-1 gap-3 md:columns-2 lg:flex">
          {skills.map((skillsGrouped, i) => (
            <ul key={i} className="md:mb-2">
              {skillsGrouped.map((skillSection) => (
                <li key={skillSection.section}>
                  <FadeIn scrollTrigger from="top">
                    <SkillSetCard className="mb-2 break-inside-avoid" skillSection={skillSection} />
                  </FadeIn>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  );
}
