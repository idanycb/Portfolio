import { FinDocHomeDiagram, GitOpsHomeDiagram, WorkNoteArrow } from "@/components/svg/HomeDrawings";
import type { WorkProject } from "@/content/home";
import { ActionLink } from "@/shared/action-link";
import { ResponsiveCopy } from "@/shared/responsive-copy";

type WorkCardProps = {
  project: WorkProject;
  index: number;
  note: string;
};

export function WorkCard({ project, index, note }: WorkCardProps) {
  return (
    <article className="grid gap-7 py-2 md:grid-cols-2 md:gap-12 md:py-4">
      <div className={index % 2 === 1 ? "md:order-2" : ""}>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-subtle text-[2.125rem] leading-none font-black tracking-[-0.05em]">
            {project.number}
          </span>
          <ResponsiveCopy
            long={project.category}
            short={project.categoryShort}
            className="text-muted font-mono text-[0.59375rem] tracking-[0.18em]"
          />
        </div>
        <ResponsiveCopy
          as="h3"
          long={project.title.join("\n")}
          short={project.titleShort?.join("\n")}
          className="text-work-title font-display text-ink mt-2 font-black whitespace-pre-line"
        />
        <ResponsiveCopy
          long={project.body}
          short={project.bodyShort}
          className="text-copy mt-4 max-w-xl text-[0.96875rem] leading-[1.62] md:mt-5 md:text-[1.0625rem]"
        />
      </div>
      <div className={index % 2 === 1 ? "md:order-1" : ""}>
        <figure className="border-signature border-ink bg-paper-light p-3 md:p-[22px]">
          {index === 0 ? <FinDocHomeDiagram /> : <GitOpsHomeDiagram />}
        </figure>
        <div data-note="" className="ink-note relative mt-3 md:mt-4">
          {index === 1 ? <WorkNoteArrow className="absolute top-0 left-0 hidden md:block" /> : null}
          <p
            className={`font-hand text-copy-muted text-lg leading-[1.3] md:text-[19px] md:leading-[1.35] ${
              index === 1
                ? "[transform:rotate(-.8deg)] md:[transform:none] md:pl-[74px]"
                : "[transform:rotate(-.6deg)] md:[transform:rotate(-.8deg)]"
            }`}
          >
            {note}
          </p>
        </div>
        <dl className="grid gap-3 md:mt-1">
          {project.facts.map((fact) => (
            <div key={fact.label} className="border-rule-light border-t pt-2.5">
              <dt className="text-muted font-mono text-[0.59375rem] font-bold tracking-[0.14em]">
                {fact.label}
              </dt>
              <dd className="text-copy-muted mt-1 text-sm leading-[1.5]">{fact.body}</dd>
            </div>
          ))}
        </dl>
        <p className="text-muted mt-5 font-mono text-[0.625rem] leading-[1.9] tracking-[0.1em]">
          {project.stack}
        </p>
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          {project.actions.map((action, actionIndex) => (
            <ActionLink
              key={action.label}
              href={action.href}
              variant={actionIndex === 0 ? "solid" : "outline"}
              className="w-full sm:w-auto"
            >
              {action.label}
            </ActionLink>
          ))}
        </div>
      </div>
    </article>
  );
}
