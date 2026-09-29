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
  // column the larger fraction. Mobile and tablet stack everything; tablet
  // already uses the wide diagram and the desktop fact grid.
  const flipped = index % 2 === 1;
  const textCol = flipped ? "layout:col-start-2" : "layout:col-start-1";
  const figureCol = flipped ? "layout:col-start-1" : "layout:col-start-2";

  return (
    <article
      className={`layout:grid layout:items-start layout:gap-14 flex flex-col ${
        flipped
          ? "layout:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
          : "layout:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      }`}
    >
      <div className={`layout:block contents ${textCol} layout:row-start-1`}>
        <div className="layout:order-none order-1 flex items-baseline gap-3.5">
          <span
            className={`font-display layout:text-[2.75rem] text-[2.125rem] leading-none font-black tracking-[-0.05em] ${
              index === 0 ? "text-numeral" : "text-subtle"
            }`}
          >
            {project.number}
          </span>
          <ResponsiveCopy
            long={project.category}
            short={project.categoryShort}
            at="tablet"
            className="text-muted layout:text-[0.625rem] layout:tracking-[0.2em] font-mono text-[0.59375rem] tracking-[0.18em]"
          />
        </div>
        <ResponsiveCopy
          as="h3"
          long={project.title.join("\n")}
          short={project.titleShort?.join("\n")}
          className="text-work-title font-display text-ink layout:order-none layout:mt-2.5 order-1 mt-2 font-black whitespace-pre-line"
        />
        <ResponsiveCopy
          long={project.body}
          short={project.bodyShort}
          at="tablet"
          className="text-copy tablet:text-base tablet:leading-[1.68] layout:order-none layout:mt-7 order-1 mt-[18px] max-w-[32.5rem] text-[0.96875rem] leading-[1.62] text-pretty"
        />

        <dl className="tablet:max-w-[32.5rem] layout:order-none layout:mt-[26px] order-2 mt-5 flex flex-col gap-3">
          {project.facts.map((fact) => (
            <div
              key={fact.label}
              className="border-rule-light tablet:grid tablet:grid-cols-[6.5rem_1fr] tablet:items-baseline tablet:gap-4 tablet:pt-3 border-t pt-[11px]"
            >
              <dt className="text-muted layout:text-[0.625rem] font-mono text-[0.59375rem] font-bold tracking-[0.14em]">
                {fact.label}
              </dt>
              <dd className="text-copy-muted tablet:mt-0 layout:text-[0.90625rem] mt-[5px] text-sm leading-[1.5]">
                {fact.body}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-muted layout:order-none layout:mt-[22px] layout:text-[0.65625rem] layout:leading-[2] layout:tracking-[0.13em] order-4 mt-[18px] font-mono text-[0.625rem] leading-[1.9] tracking-[0.12em]">
          {project.stack}
        </p>

        <div className="tablet:flex-row tablet:gap-3 layout:order-none layout:mt-[30px] order-5 mt-5 flex flex-col gap-2.5">
          {project.actions.map((action, actionIndex) => (
            <ActionLink
              key={action.label}
              href={action.href}
              variant={actionIndex === 0 ? "solid" : "outline"}
              size="compact"
              className="tablet:w-auto w-full"
            >
              {action.label}
            </ActionLink>
          ))}
        </div>
      </div>

      <div
        className={`tablet:max-w-[40rem] layout:order-none layout:mt-0 layout:max-w-none order-3 mt-[22px] ${figureCol} layout:row-start-1`}
      >
        <figure>
          <div className="border-signature border-ink bg-paper-light tablet:p-[22px] px-3.5 py-4">
            {index === 0 ? <FinDocHomeDiagram /> : <GitOpsHomeDiagram />}
          </div>
          <figcaption className="border-ink text-muted layout:mt-[9px] layout:pt-[7px] layout:text-[0.59375rem] mt-2 flex justify-between gap-4 border-t pt-1.5 font-mono text-[0.5625rem] tracking-[0.14em]">
            <span>{project.figureLabel}</span>
            <ResponsiveCopy
              long={project.figureCaption}
              short={project.figureCaptionShort}
              at="tablet"
              className="text-copy-muted text-right"
            />
          </figcaption>
        </figure>
        <div data-note="" className="ink-note layout:mt-4 relative mt-3.5">
          {flipped ? <WorkNoteArrow className="layout:block absolute top-0 left-0 hidden" /> : null}
          <p
            className={`font-hand text-copy-muted layout:text-[19px] layout:leading-[1.35] text-lg leading-[1.3] ${
              flipped
                ? "layout:[transform:none] layout:pl-[74px] [transform:rotate(-.8deg)]"
                : "layout:[transform:rotate(-.8deg)] [transform:rotate(-.6deg)]"
            }`}
          >
            {note}
          </p>
        </div>
      </div>
    </article>
  );
}
