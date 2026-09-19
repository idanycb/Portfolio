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
    <article className="grid gap-7 py-2 layout:grid-cols-2 layout:gap-12 layout:py-4">
      <div className={index % 2 === 1 ? "layout:order-2" : ""}>
        <div className="flex items-baseline gap-3">
          <span
            className={`font-display text-[2.125rem] leading-none font-black tracking-[-0.05em] layout:text-[2.75rem] ${
              index === 0 ? "text-numeral" : "text-subtle"
            }`}
          >
            {project.number}
          </span>
          <ResponsiveCopy
            long={project.category}
            short={project.categoryShort}
            className="text-muted font-mono text-xs tracking-[0.18em]"
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
          className="text-copy mt-4 max-w-xl text-[0.96875rem] leading-[1.62] layout:mt-5 layout:text-[1.0625rem]"
        />
      </div>
      <div className={index % 2 === 1 ? "layout:order-1" : ""}>
        <figure>
          <div className="border-signature border-ink bg-paper-light p-3 layout:p-[22px]">
            {index === 0 ? <FinDocHomeDiagram /> : <GitOpsHomeDiagram />}
          </div>
          <figcaption className="border-ink text-muted mt-2 flex justify-between gap-4 border-t pt-1.5 font-mono text-xs tracking-[0.14em] layout:mt-[9px] layout:pt-[7px]">
            <span>{project.figureLabel}</span>
            <ResponsiveCopy
              long={project.figureCaption}
              short={project.figureCaptionShort}
              className="text-copy-muted text-right"
            />
          </figcaption>
        </figure>
        <div data-note="" className="ink-note relative mt-3 layout:mt-4">
          {index === 1 ? <WorkNoteArrow className="absolute top-0 left-0 hidden layout:block" /> : null}
          <p
            className={`font-hand text-copy-muted text-lg leading-[1.3] layout:text-[19px] layout:leading-[1.35] ${
              index === 1
                ? "[transform:rotate(-.8deg)] layout:[transform:none] layout:pl-[74px]"
                : "[transform:rotate(-.6deg)] layout:[transform:rotate(-.8deg)]"
            }`}
          >
            {note}
          </p>
        </div>
        <dl className="grid gap-3 layout:mt-1">
          {project.facts.map((fact) => (
            <div key={fact.label} className="border-rule-light border-t pt-2.5">
              <dt className="text-muted font-mono text-xs font-bold tracking-[0.14em]">
                {fact.label}
              </dt>
              <dd className="text-copy-muted mt-1 text-sm leading-[1.5] layout:text-[0.90625rem]">{fact.body}</dd>
            </div>
          ))}
        </dl>
        <p className="text-muted mt-5 font-mono text-xs leading-[1.9] tracking-[0.1em]">
          {project.stack}
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {project.actions.map((action, actionIndex) => (
            <ActionLink
              key={action.label}
              href={action.href}
              variant={actionIndex === 0 ? "solid" : "outline"}
              size="compact"
              className="flex-[1_1_13rem]"
            >
              {action.label}
            </ActionLink>
          ))}
        </div>
      </div>
    </article>
  );
}
