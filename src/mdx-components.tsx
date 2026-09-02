import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { CaseStudyNotes } from "@/features/case-study/CaseStudyNotes";
import { CaseStudyPage } from "@/features/case-study/CaseStudyPage";
import { CaseStudySection } from "@/features/case-study/CaseStudySection";
import { DecisionBlock } from "@/features/case-study/DecisionBlock";
import { EvaluationTable } from "@/features/case-study/EvaluationTable";
import { AmendmentLineageFigure, DocumentSketch, EvolutionArrow, HandDrawnUnderline, RailArrowAnnotation, RetrievalPipelineFigure } from "@/features/case-study/EditorialIllustrations";
import { SystemFlow, TechnicalFigure } from "@/features/case-study/TechnicalFigure";

const tableClasses = "border-b border-rule px-3 py-3 align-top first:pl-0 last:pr-0";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    CaseStudyPage,
    CaseStudySection,
    TechnicalFigure,
    SystemFlow,
    DecisionBlock,
    EvaluationTable,
    CaseStudyNotes,
    AmendmentLineageFigure,
    DocumentSketch,
    EvolutionArrow,
    HandDrawnUnderline,
    RailArrowAnnotation,
    RetrievalPipelineFigure,
    h2: ({ children, ...props }) => <h2 className="font-display text-3xl leading-9 font-black tracking-[-0.045em] sm:text-4xl" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="mt-7 font-display text-xl leading-7 font-extrabold tracking-[-0.025em]" {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p className="prose-editorial mt-4 max-w-[43rem]" {...props}>{children}</p>,
    a: ({ href = "", children, ...props }) => href.startsWith("/") ? <Link href={href} className="font-sans font-semibold underline decoration-rule underline-offset-4 hover:decoration-ink" {...props}>{children}</Link> : <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="font-sans font-semibold underline decoration-rule underline-offset-4 hover:decoration-ink" {...props}>{children}</a>,
    ul: ({ children, ...props }) => <ul className="prose-editorial mt-4 max-w-[43rem] list-disc space-y-2 pl-5" {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="prose-editorial mt-4 max-w-[43rem] list-decimal space-y-2 pl-5" {...props}>{children}</ol>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    table: ({ children, ...props }) => <div className="my-6 overflow-x-auto"><table className="w-full min-w-[34rem] border-collapse text-left font-serif text-[0.95rem] leading-6 text-ink-soft" {...props}>{children}</table></div>,
    thead: ({ children, ...props }) => <thead className="border-b-2 border-ink font-mono text-[0.61rem] tracking-[0.14em] text-ink-muted uppercase" {...props}>{children}</thead>,
    th: ({ children, ...props }) => <th className={tableClasses} {...props}>{children}</th>,
    td: ({ children, ...props }) => <td className={tableClasses} {...props}>{children}</td>,
    hr: () => <hr className="my-12 border-rule" />,
    code: ({ children, ...props }) => <code className="bg-[#efece5] px-1 font-mono text-[0.85em] text-ink" {...props}>{children}</code>,
    ...components,
  };
}
