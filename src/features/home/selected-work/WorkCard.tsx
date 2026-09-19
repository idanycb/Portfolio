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
  // The exports alternate which side the diagram sits on, and give the text
  // column the larger fraction. Mobile stacks everything in DOM order.
  const flipped = index % 2 === 1;
  const textCol = flipped ? "layout:col-start-2" : "layout:col-start-1";
  const figureCol = flipped ? "layout:col-start-1" : "layout:col-start-2";

  return (
    <article
      className={`flex flex-col layout:grid layout:items-start layout:gap-14 ${
        flipped
          ? "layout:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
          : "layout:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      }`}
    >
      <div className={`contents layout:block ${textCol} layout:row-start-1`}>
        <div className="order-1 flex items-baseline gap-3.5 layout:order-none">
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
            className="text-muted font-mono text-[0.59375rem] tracking-[0.18em] layout:text-[0.625rem] layout:tracking-[0.2em]"
          />
        </div>
        <ResponsiveCopy
          as="h3"
          long={project.title.join("\n")}
          short={project.titleShort?.join("\n")}
          className="order-1 text-work-title font-display text-ink mt-2 font-black whitespace-pre-line layout:order-none layout:mt-2.5"
        />
        <ResponsiveCopy
          long={project.body}
          short={project.bodyShort}
          className="order-1 text-copy mt-[18px] max-w-[32.5rem] text-[0.96875rem] leading-[1.62] text-pretty layout:order-none layout:mt-7 layout:text-base layout:leading-[1.68]"
        />

        <dl className="order-2 mt-5 flex flex-col gap-3 layout:order-none layout:mt-[26px] layout:max-w-[32.5rem]">
        {project.facts.map((fact) => (
          <div
            key={fact.label}
            className="border-rule-light border-t pt-[11px] layout:grid layout:grid-cols-[6.5rem_1fr] layout:items-baseline layout:gap-4 layout:pt-3"
          >
            <dt className="text-muted font-mono text-[0.59375rem] font-bold tracking-[0.14em] layout:text-[0.625rem]">
              {fact.label}
            </dt>
            <dd className="text-copy-muted mt-[5px] text-sm leading-[1.5] layout:mt-0 layout:text-[0.90625rem]">
              {fact.body}
            </dd>
          </div>
          ))}
        </dl>

        <p className="order-4 text-muted mt-[18px] font-mono text-[0.625rem] leading-[1.9] tracking-[0.12em] layout:order-none layout:mt-[22px] layout:text-[0.65625rem] layout:leading-[2] layout:tracking-[0.13em]">
          {project.stack}
        </p>

        <div className="order-5 mt-5 flex flex-col gap-2.5 layout:order-none layout:mt-[30px] layout:flex-row layout:gap-3">
          {project.actions.map((action, actionIndex) => (
            <ActionLink
              key={action.label}
              href={action.href}
              variant={actionIndex === 0 ? "solid" : "outline"}
              size="compact"
              className="w-full layout:w-auto"
            >
              {action.label}
            </ActionLink>
          ))}
        </div>
      </div>

      <div className={`order-3 mt-[22px] layout:order-none layout:mt-0 ${figureCol} layout:row-start-1`}>
        <figure>
          <div className="border-signature border-ink bg-paper-light px-3.5 py-4 layout:p-[22px]">
            {index === 0 ? <FinDocHomeDiagram /> : <GitOpsHomeDiagram />}
          </div>
          <figcaption className="border-ink text-muted mt-2 flex justify-between gap-4 border-t pt-1.5 font-mono text-[0.5625rem] tracking-[0.14em] layout:mt-[9px] layout:pt-[7px] layout:text-[0.59375rem]">
            <span>{project.figureLabel}</span>
            <ResponsiveCopy
              long={project.figureCaption}
              short={project.figureCaptionShort}
              className="text-copy-muted text-right"
            />
          </figcaption>
        </figure>
        <div data-note="" className="ink-note relative mt-3.5 layout:mt-4">
          {flipped ? <WorkNoteArrow className="absolute top-0 left-0 hidden layout:block" /> : null}
          <p
            className={`font-hand text-copy-muted text-lg leading-[1.3] layout:text-[19px] layout:leading-[1.35] ${
              flipped
                ? "[transform:rotate(-.8deg)] layout:[transform:none] layout:pl-[74px]"
                : "[transform:rotate(-.6deg)] layout:[transform:rotate(-.8deg)]"
            }`}
          >
            {note}
          </p>
        </div>
      </div>

    </article>
  );
}
