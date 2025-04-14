import { type SkillSet } from "@/features/skills/data/skills";
const LEFT_ALIGNED_SECTIONS = ["Core Computer Science Concepts", "Personal Development"];

type SkillSetCardProps = {
  skillSection: SkillSet;
};
export const SkillSetCard = ({ skillSection }: SkillSetCardProps) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-xl bg-neutral-800 p-7">
      <div
        className={`${LEFT_ALIGNED_SECTIONS.includes(skillSection.section) ? "" : "justify-center"} flex w-full flex-wrap gap-1`}
      >
        {skillSection.skills.map((skillIcon) =>
          typeof skillIcon === "string" ? (
            <SkillIcon name={skillIcon} key={skillIcon} />
          ) : (
            <SkillIcon url={skillIcon.icon} name={skillIcon.name} key={skillIcon.name} />
          ),
        )}
      </div>
      <h3 className="font-body mt-4 text-sm font-medium text-white">{skillSection.section}</h3>
      <p className="text-xs font-light text-neutral-300">{skillSection.description}</p>
    </div>
  );
};

const SkillIcon = ({ url, name }: { url?: string; name: string }) => {
  return (
    <>
      {url ? (
        <div className="flex max-w-1/3 grow-1 justify-center justify-self-end pb-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
            <img src={url} alt={name} className="h-7 w-7" />
          </div>
        </div>
      ) : (
        <div className="mb-1 h-fit self-center rounded-3xl bg-neutral-900 px-3 py-1 text-[12px] font-light text-white">
          {name}
        </div>
      )}
    </>
  );
};
