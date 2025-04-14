import { skills } from "./data/skills";
import { SkillSetCard } from "./SkillSetCard";

export function SkillsGallery() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {skills.map((skillsGrouped) =>
        skillsGrouped.map((skillSection) => (
          <SkillSetCard key={skillSection.section} skillSection={skillSection} />
        )),
      )}
    </div>
  );
}
