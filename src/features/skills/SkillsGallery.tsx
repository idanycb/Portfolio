import { skills } from "./data/skills";
import { SkillSetCard } from "./SkillSetCard";

export function SkillsGallery() {
  return (
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
            <SkillSetCard
              className="mb-2 break-inside-avoid"
              key={skillSection.section}
              skillSection={skillSection}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
