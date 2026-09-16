export type CaseStudySectionData = {
  id: `s${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
  number: string;
  tocLabel: string;
  tocLabelShort?: string;
  heading: string;
  headingShort?: string;
  body?: string;
  bodyShort?: string;
  variant: "prose" | "decisions" | "evaluation" | "band";
  decisions?: readonly {
    number: string;
    heading: string;
    body: string;
    bodyShort?: string;
  }[];
  metrics?: readonly { metric: string; method: string; result: string }[];
  pipeline?: {
    caption: string;
    steps: readonly { title: string; detail: string }[];
  };
  amendmentDiagram?: {
    label: string;
    caption: string;
    filings: readonly { title: string; state: string }[];
    question: string;
    answer: string;
  };
};

export type CaseStudy = {
  slug: string;
  title: string;
  issueLabel: string;
  backLabel: string;
  backLabelShort: string;
  eyebrow: string;
  deck: string;
  metadata: readonly { label: string; value: string; valueShort?: string }[];
  tocLabel: string;
  tocLabelShort: string;
  tocOpenLabel: string;
  tocCloseLabel: string;
  tocNavLabel: string;
  railNavLabel: string;
  progressLabel: string;
  sections: readonly CaseStudySectionData[];
  evaluationHeaders: readonly [string, string, string];
  notesLabel: string;
  notes: readonly string[];
  nextLabel: string;
  backToTopLabel: string;
  next: { slug: string; label: string; labelShort?: string; href: string };
  seo: {
    title: string;
    description: string;
    openGraph: { title: string; description: string; type: "article" };
  };
};

export const caseStudies = {
  findoc: {
    slug: "findoc",
    title: "FINDOC",
    issueLabel: "CASE STUDY 01 / FINDOC",
    backLabel: "← BACK TO THE ISSUE",
    backLabelShort: "← THE ISSUE",
    eyebrow: "AI / BACKEND · RETRIEVAL",
    deck: "Making amended SEC filings answerable — with every claim traceable back to the page it came from.",
    metadata: [
      { label: "ROLE", value: "Sole engineer" },
      { label: "TIMELINE", value: "Ongoing" },
      { label: "STACK", value: "Spring · pgvector · Next.js" },
      { label: "UPDATED", value: "Sep 2026" },
    ],
    tocLabel: "ON THIS PAGE",
    tocLabelShort: "ON THIS PAGE · 8 SECTIONS",
    tocOpenLabel: "OPEN TABLE OF CONTENTS",
    tocCloseLabel: "CLOSE TABLE OF CONTENTS",
    tocNavLabel: "Case study table of contents",
    railNavLabel: "Case study sections",
    progressLabel: "§1 OF 8",
    sections: [
      {
        id: "s1",
        number: "§1",
        tocLabel: "SUMMARY",
        heading: "EXECUTIVE SUMMARY",
        body: "Financial filings are long, revised over time, and hostile to naïve retrieval. FinDoc imports SEC EDGAR filings, parses and indexes their structured sections, stores embeddings in PostgreSQL/pgvector, retrieves evidence progressively, and returns answers grounded in citations tied back to filing metadata.",
        variant: "prose",
      },
      {
        id: "s2",
        number: "§2",
        tocLabel: "THE PROBLEM",
        heading: "THE PROBLEM, DRAWN",
        body: "An annual report is not one document. A 10-K/A amends specific sections of its parent filing and leaves the rest standing. Treat the newest file as the truth and you answer confidently from a document that was never complete; treat them as separate documents and you cite text that has since been revised.",
        variant: "prose",
        amendmentDiagram: {
          label: "Three related SEC filings resolve into one applicable evidence set.",
          caption: "AMENDMENTS SUPERSEDE PARTS, NOT WHOLE FILINGS",
          filings: [
            { title: "10-K", state: "BASE FILING" },
            { title: "10-K/A", state: "SECTION UPDATE" },
            { title: "10-K/A #2", state: "LATER UPDATE" },
          ],
          question: "WHICH TEXT APPLIES?",
          answer: "RESOLVE LINEAGE AT QUERY TIME",
        },
      },
      {
        id: "s3",
        number: "§3",
        tocLabel: "SYSTEM",
        heading: "SYSTEM",
        body: "Ingestion pulls filings from EDGAR, Docling parses them into structured sections, and chunks are embedded into pgvector alongside their filing metadata. Retrieval runs in passes and stops as soon as the evidence is sufficient; generation only ever sees text it can cite.",
        variant: "prose",
        pipeline: {
          caption: "INGESTION → RETRIEVAL → CITED ANSWER",
          steps: [
            { title: "EDGAR pull", detail: "Source filing and amendment metadata" },
            { title: "Docling parse", detail: "Structured sections and chunks" },
            { title: "pgvector + lineage", detail: "Embeddings with filing relationships" },
            { title: "Progressive retrieval", detail: "Evidence gathered in passes" },
            { title: "Cited answer", detail: "Claims tied back to filing metadata" },
          ],
        },
      },
      {
        id: "s4",
        number: "§4",
        tocLabel: "DECISIONS",
        heading: "DECISIONS I'D DEFEND IN A REVIEW",
        variant: "decisions",
        decisions: [
          {
            number: "1",
            heading: "Amendment lineage over latest-wins",
            body: "A 10-K/A supersedes parts of its parent, not the whole document. Retrieval resolves lineage at query time rather than at ingest — slower to write, correct to read. [1]",
          },
          {
            number: "2",
            heading: "Idempotent imports keyed on accession number",
            body: "Re-running an import is free and safe, which makes backfills and reprocessing routine instead of frightening. [2]",
          },
          {
            number: "3",
            heading: "Progressive retrieval before generation",
            body: "Cheap passes run first; expensive passes only when the evidence is thin. Costs latency, buys grounding — the model is never asked to synthesize from noise. [3]",
          },
        ],
      },
      {
        id: "s5",
        number: "§5",
        tocLabel: "EVALUATION",
        heading: "EVALUATION",
        variant: "evaluation",
        metrics: [
          { metric: "Citation accuracy", method: "GOLD SET", result: "— to fill" },
          { metric: "Retrieval precision @ k", method: "HARNESS", result: "— to fill" },
          { metric: "p95 vector search latency", method: "LOAD TEST", result: "< 100 MS" },
        ],
      },
      {
        id: "s6",
        number: "§6",
        tocLabel: "DEPLOYMENT",
        heading: "DEPLOYMENT",
        body: "FinDoc runs containerised on AWS with the same discipline as the cluster described in the GitOps case study: configuration declared, secrets held outside the repo, and deployments reproducible from a clean checkout.",
        variant: "prose",
      },
      {
        id: "s7",
        number: "§7",
        tocLabel: "WHAT CHANGED SINCE V1",
        tocLabelShort: "SINCE V1",
        heading: "WHAT CHANGED SINCE V1",
        body: "v1 used Unstructured.io and Groq over generic multi-tenant documents. v2 replaced ingestion with Docling, narrowed the domain to SEC filings, added amendment lineage and citation provenance, and introduced retrieval evaluation. The architecture changed because the problem got sharper.",
        variant: "band",
      },
      {
        id: "s8",
        number: "§8",
        tocLabel: "CONCLUSION",
        heading: "CONCLUSION",
        body: "The interesting work in retrieval is not the model call. It is deciding what counts as evidence, proving the answer came from there, and being honest when the evidence is thin.",
        variant: "prose",
      },
    ],
    evaluationHeaders: ["METRIC", "METHOD", "RESULT"],
    notesLabel: "NOTES",
    notes: [
      "[1] ADR-1 — AMENDMENT LINEAGE · REPO /DOCS/ADR ↗",
      "[2] ADR-2 — IDEMPOTENT INGESTION · COMMIT 8BE0CD3 ↗",
      "[3] RETRIEVAL NOTES & EVAL HARNESS ↗",
    ],
    nextLabel: "NEXT CASE STUDY",
    backToTopLabel: "BACK TO TOP ↑",
    next: {
      slug: "portfolio-gitops",
      label: "PORTFOLIO GITOPS →",
      labelShort: "PORTFOLIO\nGITOPS →",
      href: "/projects/portfolio-gitops",
    },
    seo: {
      title: "FinDoc Case Study | Daniel Thomas Jesudoss",
      description:
        "Making amended SEC filings answerable, with every claim traceable back to the page it came from.",
      openGraph: {
        title: "FinDoc Case Study | Daniel Thomas Jesudoss",
        description:
          "Making amended SEC filings answerable, with every claim traceable back to the page it came from.",
        type: "article",
      },
    },
  },
} as const satisfies Record<string, CaseStudy>;

export type CaseStudySlug = keyof typeof caseStudies;
