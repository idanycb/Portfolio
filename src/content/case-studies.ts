export type CaseStudySectionData = {
  id: `s${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
  number: string;
  tocLabel: string;
  tocLabelShort?: string;
  heading: string;
  headingShort?: string;
  body?: string;
  bodyShort?: string;
  bodyAfter?: string;
  bodyAfterShort?: string;
  note?: string;
  variant: "prose" | "decisions" | "evaluation" | "band";
  decisions?: readonly {
    number: string;
    heading: string;
    body: string;
    bodyShort?: string;
    note?: string;
  }[];
  metrics?: readonly { metric: string; method: string; result: string }[];
  pipeline?: {
    figureNumber: string;
    caption: string;
    captionShort?: string;
    steps: readonly [
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
    ];
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
  titleSize?: "default" | "compact";
  issueLabel: string;
  issueLabelShort?: string;
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
  railNote: string;
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
    railNote: "the rail tracks where you are",
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
          caption: "THE AMENDMENT PROBLEM",
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
          figureNumber: "2",
          caption: "INGESTION → RETRIEVAL → CITED ANSWER",
          captionShort: "INGESTION → CITED ANSWER",
          steps: [
            { title: "EDGAR pull", detail: "Source filing and amendment metadata" },
            { title: "Docling parse", detail: "Structured sections and chunks" },
            { title: "Chunk + embed", detail: "Evidence-sized text with vector embeddings" },
            { title: "pgvector + lineage", detail: "Embeddings with filing relationships" },
            { title: "Progressive retrieval", detail: "Evidence gathered in passes" },
            { title: "Cited answer", detail: "Claims tied back to filing metadata" },
          ],
        },
        note: "lineage is resolved here, at query time",
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
            note: "cost: query-time complexity. worth it.",
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
        note: "this section turns “outdated” into “evolving”",
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
      href: "/work/portfolio-gitops",
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
  "portfolio-gitops": {
    slug: "portfolio-gitops",
    title: "PORTFOLIO GITOPS",
    titleSize: "compact",
    issueLabel: "CASE STUDY 02 / INFRASTRUCTURE",
    issueLabelShort: "CASE STUDY 02",
    backLabel: "← BACK TO THE ISSUE",
    backLabelShort: "← THE ISSUE",
    eyebrow: "PLATFORM ENGINEERING · GITOPS",
    deck: "A self-healing personal Kubernetes platform, declared in Git from first boot through every public deployment.",
    metadata: [
      { label: "ROLE", value: "Platform engineer" },
      { label: "TIMELINE", value: "Feb 2026 — ongoing", valueShort: "2026 — ongoing" },
      { label: "STACK", value: "K3s · FluxCD · OCI" },
      { label: "SCOPE", value: "Production platform" },
    ],
    tocLabel: "ON THIS PAGE",
    tocLabelShort: "ON THIS PAGE · 7 SECTIONS",
    tocOpenLabel: "OPEN TABLE OF CONTENTS",
    tocCloseLabel: "CLOSE TABLE OF CONTENTS",
    tocNavLabel: "Case study table of contents",
    railNavLabel: "Case study sections",
    progressLabel: "§1 OF 7",
    railNote: "Git declares it; Flux keeps it true",
    sections: [
      {
        id: "s1",
        number: "§1",
        tocLabel: "SUMMARY",
        heading: "EXECUTIVE SUMMARY",
        body: "This repository provisions and operates a personal portfolio cluster on Oracle Cloud Infrastructure ARM compute without manual SSH work after the initial VM click. A generated cloud-init payload installs K3s, bootstraps Infisical for secret management, and hands ongoing control to FluxCD. Flux continuously reconciles the desired state from Git, making changes auditable, reviewable, and reversible.",
        variant: "prose",
      },
      {
        id: "s2",
        number: "§2",
        tocLabel: "THE PLATFORM",
        heading: "THE PLATFORM",
        body: "The cluster solves two related problems: zero-touch node provisioning from a fresh VM, and declarative ownership of ingress, TLS, deployments, network policy, and secret references. It hosts the portfolio at danycb.com and FinDoc at doc-analyzer.danycb.com.",
        bodyAfter:
          "FinDoc is a multi-component application: Spring Boot, Next.js, pgvector, a document parser, AWS S3 and SQS, and LLM inference. The GitOps repository is the infrastructure contract around that workload.",
        variant: "prose",
        pipeline: {
          figureNumber: "1",
          caption: "FLUX RECONCILES DESIRED STATE INTO THE RUNNING CLUSTER",
          captionShort: "THE RECONCILIATION LOOP",
          steps: [
            { title: "Cloud-init", detail: "Create the node from a generated payload" },
            { title: "Install K3s", detail: "Start the cluster without bundled Traefik" },
            { title: "Infisical", detail: "Provide the Flux SSH credential" },
            { title: "FluxCD", detail: "Reconcile controllers, then configuration" },
            { title: "Workloads", detail: "Run portfolio and FinDoc namespaces" },
            { title: "Desired state", detail: "Correct drift against the Git declaration" },
          ],
        },
      },
      {
        id: "s3",
        number: "§3",
        tocLabel: "ARCHITECTURE",
        heading: "ARCHITECTURE & SYSTEM DESIGN",
        headingShort: "ARCHITECTURE",
        body: "The platform is organized into cluster compute, GitOps reconciliation, and application workloads. The split between infrastructure controllers and configuration is intentional: cert-manager CRDs must exist before a ClusterIssuer is applied, and the Infisical operator must run before InfisicalSecret resources reconcile.",
        bodyAfter:
          "A wildcard certificate covers *.danycb.com and the apex domain through Let's Encrypt ACME DNS-01 with Cloudflare. Sensitive values come from Infisical Cloud through Kubernetes-native authentication; no application secrets live in Git.",
        variant: "prose",
        pipeline: {
          figureNumber: "2",
          caption: "ORDERED INFRASTRUCTURE, INGRESS, AND WORKLOAD PATHS",
          captionShort: "PUBLIC TO PRIVATE PATH",
          steps: [
            { title: "Internet", detail: "Reach the OCI public IP on ports 80 and 443" },
            { title: "Traefik", detail: "Terminate ingress through Gateway API" },
            { title: "Wildcard TLS", detail: "Secure apex and subdomains through DNS-01" },
            { title: "Frontend", detail: "Expose the public application surface" },
            { title: "Services", detail: "Keep backend services private" },
            { title: "Data layer", detail: "Keep pgvector and parser traffic internal" },
          ],
        },
      },
      {
        id: "s4",
        number: "§4",
        tocLabel: "DECISIONS",
        heading: "KEY TECHNICAL DECISIONS",
        headingShort: "KEY TECHNICAL\nDECISIONS",
        variant: "decisions",
        decisions: [
          {
            number: "1",
            heading: "FluxCD over Argo CD",
            body: "Flux image automation polls GHCR, selects images by policy, commits tag updates, and triggers redeploys as one closed loop. Its smaller footprint also suits a constrained single-node cluster. The tradeoff is that automated fluxcdbot commits and alphabetical tag ordering become part of the operating model. [1]",
          },
          {
            number: "2",
            heading: "K3s with Traefik disabled, then re-owned by Flux",
            body: "K3s ships with Traefik, but two owners for the same controller create conflicts. Disabling the bundled install gives Flux exclusive ownership, accepting a short ingress-free interval during a clean bootstrap.",
          },
          {
            number: "3",
            heading: "Infisical over sealed secrets or SOPS",
            body: "The operator uses the cluster's own Kubernetes identity rather than static credentials. A transient Infisical outage can delay rotation but does not interrupt already-running pods.",
          },
          {
            number: "4",
            heading: "Gateway API and DNS-01 wildcard TLS",
            body: "Gateway API is the only enabled Traefik routing provider. DNS-01 supports wildcards without requiring an HTTP challenge endpoint, allowing one certificate to cover current and future subdomains.",
          },
        ],
      },
      {
        id: "s5",
        number: "§5",
        tocLabel: "BOOTSTRAP",
        heading: "THE BOOTSTRAP CHICKEN-AND-EGG PROBLEM",
        headingShort: "THE BOOTSTRAP\nPROBLEM",
        body: "Flux needs an SSH key to connect to GitHub, but that key lives in Infisical and the Infisical operator needs a running cluster. Cloud-init resolves the cycle in two phases: first it creates K3s and the minimum Infisical setup required to fetch the Flux key; then it bootstraps Flux, which assumes full ownership. Cleanup removes bootstrap artifacts and the temporary key afterward.",
        bodyAfter:
          "Application images follow a comparable loop: CI pushes to GHCR, Flux image automation discovers a permitted tag, commits the selected version to Git, and Flux reconciles the resulting rollout.",
        variant: "prose",
        pipeline: {
          figureNumber: "3",
          caption: "THE SMALLEST VIABLE SECRET CROSSES THE BOOTSTRAP BOUNDARY",
          captionShort: "TWO-PHASE BOOTSTRAP",
          steps: [
            { title: "Fresh VM", detail: "Start from OCI ARM compute" },
            { title: "Install K3s", detail: "Create the cluster without bundled Traefik" },
            { title: "Operator", detail: "Install Infisical and cluster authentication" },
            { title: "Flux key", detail: "Fetch only the bootstrap SSH secret" },
            { title: "Bootstrap", detail: "Connect Flux to GitHub" },
            { title: "Cleanup", detail: "Remove temporary key and runtime artifacts" },
          ],
        },
      },
      {
        id: "s6",
        number: "§6",
        tocLabel: "CONSTRAINTS",
        heading: "RELIABILITY & CONSTRAINTS",
        body: "The system is deliberately candid about its limits. It runs on a single OCI node, so reboot or maintenance produces full downtime. pgvector uses K3s local-path storage with no backup mechanism; embeddings and metadata are at risk on node failure. At full load, parser and database workloads compete on a constrained CPU budget.",
        bodyAfter:
          "Security work still open includes pod security contexts, resource limits for the FinDoc frontend, and restricting the internet-exposed K3s API server.",
        variant: "evaluation",
        metrics: [
          {
            metric: "Git reconciliation",
            method: "ABOUT 1 MINUTE",
            result: "Fast convergence",
          },
          {
            metric: "Image deployment",
            method: "UP TO 5.5 HOURS",
            result: "Polling bound",
          },
          {
            metric: "Storage",
            method: "100MI LOCAL-PATH PVC",
            result: "No recovery path",
          },
          {
            metric: "Node topology",
            method: "ONE OCI ARM NODE",
            result: "No high availability",
          },
        ],
      },
      {
        id: "s7",
        number: "§7",
        tocLabel: "NEXT WORK",
        heading: "NEXT WORK",
        body: "The immediate roadmap is pragmatic: put run-verify.sh behind a GitHub Actions pull-request check, correct image-tag ordering with zero-padded counts, add a pgvector backup path, define pod security contexts, enable Helm drift detection, and introduce lightweight monitoring. The platform is production-running, but those constraints are known rather than ignored.",
        variant: "band",
        note: "production-running, with limits made explicit",
      },
    ],
    evaluationHeaders: ["OPERATING DETAIL", "CURRENT VALUE", "IMPLICATION"],
    notesLabel: "NOTES",
    notes: [
      "[1] Flux owns image updates and reconciliation after bootstrap.",
      "[2] The controller-to-configuration split prevents CRD ordering failures on cold start.",
      "[3] Single-node availability and local-path storage remain the principal operational risks.",
    ],
    nextLabel: "NEXT CASE STUDY",
    backToTopLabel: "BACK TO TOP ↑",
    next: {
      slug: "findoc",
      label: "FINDOC →",
      href: "/work/findoc",
    },
    seo: {
      title: "Portfolio GitOps Case Study | Daniel Thomas Jesudoss",
      description: "A declarative, self-healing K3s portfolio cluster operated with FluxCD.",
      openGraph: {
        title: "Portfolio GitOps Case Study | Daniel Thomas Jesudoss",
        description: "A declarative, self-healing K3s portfolio cluster operated with FluxCD.",
        type: "article",
      },
    },
  },
} as const satisfies Record<string, CaseStudy>;

export type CaseStudySlug = keyof typeof caseStudies;
