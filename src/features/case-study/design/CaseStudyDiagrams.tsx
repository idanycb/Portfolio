import type { CaseStudySectionData } from "@/content/case-studies";

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const horizontal = y1 === y2;
  return (
    <g aria-hidden="true">
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-ink" strokeWidth="2" />
      {horizontal ? (
        <path d={`M ${x2 - 9} ${y2 - 6} L ${x2} ${y2} L ${x2 - 9} ${y2 + 6}`} className="fill-none stroke-ink" strokeWidth="2" />
      ) : (
        <path d={`M ${x2 - 6} ${y2 - 9} L ${x2} ${y2} L ${x2 + 6} ${y2 - 9}`} className="fill-none stroke-ink" strokeWidth="2" />
      )}
    </g>
  );
}

function Filing({ x, title, state }: { x: number; title: string; state: string }) {
  return (
    <g transform={`translate(${x} 38)`}>
      <path d="M0 0 H112 L140 28 V164 H0 Z" className="fill-paper-light stroke-ink" strokeWidth="2" />
      <path d="M112 0 V28 H140" className="fill-none stroke-ink" strokeWidth="2" />
      <line x1="22" y1="74" x2="116" y2="74" className="stroke-rule" strokeWidth="5" />
      <line x1="22" y1="94" x2="104" y2="94" className="stroke-rule" strokeWidth="5" />
      <line x1="22" y1="114" x2="88" y2="114" className="stroke-rule" strokeWidth="5" />
      <text x="16" y="-12" className="fill-ink font-mono text-[14px] font-bold">{title}</text>
      <text x="16" y="148" className="fill-muted font-mono text-[9px] font-bold tracking-[0.12em]">{state}</text>
    </g>
  );
}

export function AmendmentDiagram({ diagram }: { diagram: NonNullable<CaseStudySectionData["amendmentDiagram"]> }) {
  return (
    <figure className="mt-8 border-[1.5px] border-ink bg-paper-light p-3 md:p-6">
      <svg viewBox="0 0 820 300" role="img" aria-label={diagram.label} className="hidden h-auto w-full md:block">
        {diagram.filings.map((filing, index) => <Filing key={filing.title} x={20 + index * 174} {...filing} />)}
        <Arrow x1={500} y1={120} x2={572} y2={120} />
        <rect x="586" y="64" width="212" height="112" className="fill-band stroke-ink" strokeWidth="2" />
        <text x="692" y="108" textAnchor="middle" className="fill-ink font-mono text-[13px] font-bold">{diagram.question}</text>
        <text x="692" y="137" textAnchor="middle" className="fill-copy-muted font-mono text-[10px] font-bold">{diagram.answer}</text>
        <path d="M90 226 C210 272 382 272 456 226" className="fill-none stroke-ink" strokeWidth="2" strokeDasharray="7 7" />
      </svg>
      <svg viewBox="0 0 330 650" role="img" aria-label={diagram.label} className="h-auto w-full md:hidden">
        {diagram.filings.map((filing, index) => (
          <g key={filing.title}>
            <g transform={`translate(94 ${22 + index * 158}) scale(.95)`}><Filing x={0} {...filing} /></g>
            {index < diagram.filings.length - 1 ? <Arrow x1={165} y1={190 + index * 158} x2={165} y2={214 + index * 158} /> : null}
          </g>
        ))}
        <Arrow x1={165} y1={500} x2={165} y2={524} />
        <rect x="34" y="538" width="262" height="86" className="fill-band stroke-ink" strokeWidth="2" />
        <text x="165" y="574" textAnchor="middle" className="fill-ink font-mono text-[12px] font-bold">{diagram.question}</text>
        <text x="165" y="598" textAnchor="middle" className="fill-copy-muted font-mono text-[9px] font-bold">{diagram.answer}</text>
      </svg>
      <figcaption className="border-t border-ink pt-2 font-mono text-[0.5625rem] font-bold tracking-[0.12em] text-copy-muted">{diagram.caption}</figcaption>
    </figure>
  );
}

export function PipelineDiagram({ pipeline }: { pipeline: NonNullable<CaseStudySectionData["pipeline"]> }) {
  return (
    <figure className="mt-8 border-[1.5px] border-ink bg-paper-light p-3 md:p-6">
      <svg viewBox="0 0 900 260" role="img" aria-label={pipeline.caption} className="hidden h-auto w-full md:block">
        {pipeline.steps.map((step, index) => {
          const x = 10 + index * 178;
          return (
            <g key={step.title}>
              <rect x={x} y="38" width="150" height="152" className={index === pipeline.steps.length - 1 ? "fill-band stroke-ink" : "fill-paper-light stroke-ink"} strokeWidth="2" />
              <text x={x + 16} y="68" className="fill-muted font-mono text-[10px] font-bold">{String(index + 1).padStart(2, "0")}</text>
              <text x={x + 16} y="100" className="fill-ink font-sans text-[14px] font-extrabold">{step.title}</text>
              <foreignObject x={x + 16} y="116" width="118" height="58">
                <p className="m-0 font-serif text-[11px] leading-[1.45] text-copy-muted">{step.detail}</p>
              </foreignObject>
              {index < pipeline.steps.length - 1 ? <Arrow x1={x + 151} y1={114} x2={x + 174} y2={114} /> : null}
            </g>
          );
        })}
      </svg>
      <ol className="grid gap-0 md:hidden">
        {pipeline.steps.map((step, index) => (
          <li key={step.title} className={`relative border-x-[1.5px] border-t-[1.5px] border-ink p-4 last:border-b-[1.5px] ${index === pipeline.steps.length - 1 ? "bg-band" : "bg-paper-light"}`}>
            <span className="font-mono text-[0.5625rem] font-bold tracking-[0.12em] text-muted">{String(index + 1).padStart(2, "0")}</span>
            <strong className="mt-1 block text-sm font-extrabold">{step.title}</strong>
            <span className="mt-1 block font-serif text-xs leading-5 text-copy-muted">{step.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 border-t border-ink pt-2 font-mono text-[0.5625rem] font-bold tracking-[0.12em] text-copy-muted">{pipeline.caption}</figcaption>
    </figure>
  );
}
