import {
  CaseSectionUnderline,
  DecisionCircle,
  SectionSevenArrow,
} from "@/components/svg/CaseStudyDrawings";
import type { CaseStudy, CaseStudySectionData } from "@/content/case-studies";
import { ResponsiveCopy } from "@/shared/responsive-copy";

import { AmendmentDiagram, PipelineDiagram } from "./CaseStudyDiagrams";

function keepLastWordsTogether(value: string | undefined) {
  if (!value || value.trim().split(/\s+/).length < 3) return value;
  return value.replace(/ ([^ ]+)$/, "\u00a0$1");
}

function Prose({ body, bodyShort }: { body: string; bodyShort?: string }) {
  return (
    <ResponsiveCopy
      long={body}
      short={bodyShort}
      className="case-study-prose text-copy mt-5 max-w-[47rem] font-serif text-[0.96875rem] leading-[1.72] layout:text-base layout:leading-[1.75]"
    />
  );
}

function Decisions({ decisions }: { decisions: NonNullable<CaseStudySectionData["decisions"]> }) {
  return (
    <ol className="mt-7 space-y-8 layout:space-y-9">
      {decisions.map((decision, index) => (
        <li key={decision.number} className="grid gap-3 layout:grid-cols-[4.125rem_1fr] layout:gap-6">
          <DecisionCircle number={decision.number} index={index} />
          <div>
            <h3 className="text-balance text-[1.1875rem] leading-[1.2] font-extrabold tracking-[-0.02em] layout:text-[1.3125rem]">
              {decision.heading}
            </h3>
            <ResponsiveCopy
              long={decision.body}
              short={decision.bodyShort}
              className="text-copy mt-2 max-w-[43rem] font-serif text-[0.9375rem] leading-[1.72]"
            />
            {decision.note ? (
              <p
                data-note=""
                className="ink-note font-hand text-muted mt-2 text-base leading-[1.3]"
              >
                {decision.note}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Evaluation({
  metrics,
  headers,
}: {
  metrics: NonNullable<CaseStudySectionData["metrics"]>;
  headers: CaseStudy["evaluationHeaders"];
}) {
  return (
    <div className="mt-7">
      <div className="border-ink text-muted hidden grid-cols-[1.35fr_1fr_0.8fr] border-b-[1.5px] pb-2 font-mono text-[0.59375rem] font-bold tracking-[0.14em] layout:grid">
        {headers.map((header) => (
          <span key={header}>{header}</span>
        ))}
      </div>
      {metrics.map((metric) => (
        <dl
          key={metric.metric}
          className="border-rule grid gap-3 border-b py-5 layout:grid-cols-[1.35fr_1fr_0.8fr] layout:gap-0"
        >
          <div>
            <dt className="text-muted font-mono text-[0.5625rem] layout:text-[0.59375rem] tracking-[0.12em] layout:hidden">
              {headers[0]}
            </dt>
            <dd className="text-ink mt-1 text-[0.9375rem] layout:mt-0">{metric.metric}</dd>
          </div>
          <div>
            <dt className="text-muted font-mono text-[0.5625rem] layout:text-[0.59375rem] tracking-[0.12em] layout:hidden">
              {headers[1]}
            </dt>
            <dd className="text-muted mt-1 font-mono text-[0.625rem] layout:text-[0.71875rem] tracking-[0.08em] layout:mt-0">
              {metric.method}
            </dd>
          </div>
          <div>
            <dt className="text-muted font-mono text-[0.5625rem] layout:text-[0.59375rem] tracking-[0.12em] layout:hidden">
              {headers[2]}
            </dt>
            <dd className="mt-1 font-mono text-[0.6875rem] layout:text-[0.71875rem] font-bold layout:mt-0">{metric.result}</dd>
          </div>
        </dl>
      ))}
    </div>
  );
}

export function CaseStudySection({
  section,
  evaluationHeaders,
}: {
  section: CaseStudySectionData;
  evaluationHeaders: CaseStudy["evaluationHeaders"];
}) {
  const band = section.variant === "band";
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`scroll-mt-28 ${band ? "border-ink bg-band relative -mx-5 overflow-hidden border-y-[1.5px] px-5 py-[2.125rem] layout:-mx-12 layout:px-12 layout:py-12" : "border-rule border-t pt-7 first:border-t-0 first:pt-0"}`}
    >
      {band ? <SectionSevenArrow /> : null}
      <header className="flex items-start gap-2 layout:gap-4">
        <span className="text-muted shrink-0 pt-1 font-mono text-[0.71875rem] layout:text-xs font-bold tracking-[0.1em]">
          {section.number}
        </span>
        <ResponsiveCopy
          as="h2"
          id={`${section.id}-title`}
          long={keepLastWordsTogether(section.heading)}
          short={keepLastWordsTogether(section.headingShort)}
          className="text-case-section font-display text-pretty font-black"
        />
      </header>
      {section.id !== "s7" ? (
        <CaseSectionUnderline id={section.id as "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s8"} />
      ) : null}
      {section.body ? <Prose body={section.body} bodyShort={section.bodyShort} /> : null}
      {section.amendmentDiagram ? <AmendmentDiagram diagram={section.amendmentDiagram} /> : null}
      {section.pipeline ? <PipelineDiagram pipeline={section.pipeline} /> : null}
      {section.note && section.id === "s3" ? (
        <p
          data-note=""
          className="ink-note font-hand text-copy-muted mt-3.5 text-[17px] leading-[1.3] layout:hidden"
        >
          {section.note}
        </p>
      ) : null}
      {section.decisions ? <Decisions decisions={section.decisions} /> : null}
      {section.metrics ? (
        <Evaluation metrics={section.metrics} headers={evaluationHeaders} />
      ) : null}
      {section.note && section.id === "s7" ? (
        <p
          data-note=""
          className="ink-note font-hand text-copy-muted mt-3.5 text-[17px] leading-[1.3]"
        >
          {section.note}
        </p>
      ) : null}
    </section>
  );
}
