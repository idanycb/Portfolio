import { type SkillSet } from "@/features/skills/data/skills";
const LEFT_ALIGNED_SECTIONS = ["Core Computer Science Concepts", "Personal Development"];

type SkillSetCardProps = {
  skillSection: SkillSet;
  className?: string;
};
export const SkillSetCard = ({ skillSection, className }: SkillSetCardProps) => {
  return (
    <div
      className={"flex w-full flex-col gap-1 rounded-xl bg-neutral-800 p-8 lg:p-10 " + className}
    >
      <div
        className={`${LEFT_ALIGNED_SECTIONS.includes(skillSection.section) ? "" : "justify-center"} mb-1 flex w-full flex-wrap gap-1`}
      >
        {skillSection.skills.map((skillIcon) =>
          typeof skillIcon === "string" ? (
            <SkillIcon skillName={skillIcon} key={skillIcon} />
          ) : (
            <SkillIcon
              skillIconUrl={skillIcon.icon}
              skillName={skillIcon.name}
              key={skillIcon.name}
            />
          ),
        )}
      </div>
      <h3 className="font-body mt-4 text-sm font-medium text-white sm:text-base">
        {skillSection.section}
      </h3>
      <p className="text-xs font-light text-neutral-300 sm:text-sm">{skillSection.description}</p>
    </div>
  );
};

type SkillIconProps = {
  skillIconUrl?: string;
  skillName: string;
};
const SkillIcon = ({ skillIconUrl: url, skillName: name }: SkillIconProps) => {
  return (
    <>
      {url ? (
        <div className="flex max-w-1/3 grow-1 justify-center justify-self-end pb-1 lg:pb-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 lg:h-16 lg:w-16">
            <img src={url} alt={name} className="h-7 w-7 lg:h-8 lg:w-8" />
          </div>
        </div>
      ) : (
        <div className="mb-1 h-fit self-center rounded-3xl bg-neutral-900 px-3 py-1 text-[12px] font-light text-white lg:px-4 lg:py-2 lg:text-[14px]">
          {name}
        </div>
      )}
    </>
  );
};
