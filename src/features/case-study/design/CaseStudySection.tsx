import type { CaseStudy, CaseStudySectionData } from "@/content/case-studies";
import { ResponsiveCopy } from "@/shared/responsive-copy";

import { AmendmentDiagram, PipelineDiagram } from "./CaseStudyDiagrams";

function Prose({ body, bodyShort }: { body: string; bodyShort?: string }) {
  return (
    <ResponsiveCopy
      long={body}
      short={bodyShort}
      className="case-study-prose mt-5 max-w-[47rem] font-serif text-[0.96875rem] leading-[1.72] text-copy md:text-base md:leading-[1.75]"
    />
  );
}

function Decisions({ decisions }: { decisions: NonNullable<CaseStudySectionData["decisions"]> }) {
  return (
    <ol className="mt-7 space-y-8 md:space-y-9">
      {decisions.map((decision) => (
        <li key={decision.number} className="grid gap-3 md:grid-cols-[4.125rem_1fr] md:gap-6">
          <span className="flex h-[2.875rem] w-[2.875rem] items-center justify-center border-[1.5px] border-ink font-mono text-lg font-bold md:h-[4.125rem] md:w-[4.125rem]">
            {decision.number}
          </span>
          <div>
            <h3 className="text-[1.1875rem] leading-[1.2] font-extrabold md:text-[1.3125rem]">{decision.heading}</h3>
            <ResponsiveCopy long={decision.body} short={decision.bodyShort} className="mt-2 max-w-[43rem] font-serif text-[0.9375rem] leading-[1.72] text-copy" />
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
      <div className="hidden grid-cols-[1.35fr_1fr_0.8fr] border-b-[1.5px] border-ink pb-2 font-mono text-[0.625rem] font-bold tracking-[0.14em] text-muted md:grid">
        {headers.map((header) => <span key={header}>{header}</span>)}
      </div>
      {metrics.map((metric) => (
        <dl key={metric.metric} className="grid gap-3 border-b border-rule py-5 md:grid-cols-[1.35fr_1fr_0.8fr] md:gap-0">
          <div><dt className="font-mono text-[0.5625rem] tracking-[0.12em] text-muted md:hidden">{headers[0]}</dt><dd className="mt-1 font-serif text-[0.96875rem] text-copy md:mt-0">{metric.metric}</dd></div>
          <div><dt className="font-mono text-[0.5625rem] tracking-[0.12em] text-muted md:hidden">{headers[1]}</dt><dd className="mt-1 font-mono text-[0.6875rem] font-bold tracking-[0.08em] md:mt-0">{metric.method}</dd></div>
          <div><dt className="font-mono text-[0.5625rem] tracking-[0.12em] text-muted md:hidden">{headers[2]}</dt><dd className="mt-1 font-mono text-[0.75rem] font-bold md:mt-0">{metric.result}</dd></div>
        </dl>
      ))}
    </div>
  );
}

export function CaseStudySection({ section, evaluationHeaders }: { section: CaseStudySectionData; evaluationHeaders: CaseStudy["evaluationHeaders"] }) {
  const band = section.variant === "band";
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`scroll-mt-28 ${band ? "-mx-5 border-y-[1.5px] border-ink bg-band px-5 py-[2.125rem] md:-mx-12 md:px-12 md:py-12" : "border-t border-rule pt-7 first:border-t-0 first:pt-0"}`}
    >
      <header className="flex items-start gap-4">
        <span className="shrink-0 pt-1 font-mono text-[0.6875rem] font-bold tracking-[0.08em] text-muted">{section.number}</span>
        <ResponsiveCopy as="h2" id={`${section.id}-title`} long={section.heading} short={section.headingShort} className="text-case-section font-display font-black" />
      </header>
      {section.body ? <Prose body={section.body} bodyShort={section.bodyShort} /> : null}
      {section.amendmentDiagram ? <AmendmentDiagram diagram={section.amendmentDiagram} /> : null}
      {section.pipeline ? <PipelineDiagram pipeline={section.pipeline} /> : null}
      {section.decisions ? <Decisions decisions={section.decisions} /> : null}
      {section.metrics ? <Evaluation metrics={section.metrics} headers={evaluationHeaders} /> : null}
    </section>
  );
}
