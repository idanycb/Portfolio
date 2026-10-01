/** `box` by default; `store` draws a cylinder, `process` a rounded box. */
export type PipelineStep = { title: string; detail: string; shape?: "store" | "process" };

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
      PipelineStep,
      PipelineStep,
      PipelineStep,
      PipelineStep,
      PipelineStep,
      PipelineStep,
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
    deck: "Ask an SEC filing a question and get an answer that cites where it came from, even after amendments.",
    metadata: [
      { label: "ROLE", value: "Built it solo" },
      { label: "TIMELINE", value: "Ongoing" },
      { label: "STACK", value: "Spring · pgvector · Next.js" },
      { label: "UPDATED", value: "Sep 2026" },
    ],
    tocLabel: "ON THIS PAGE",
    tocLabelShort: "ON THIS PAGE · 8 SECTIONS",
    tocOpenLabel: "SHOW TABLE OF CONTENTS",
    tocCloseLabel: "HIDE TABLE OF CONTENTS",
    tocNavLabel: "Case study table of contents",
    railNavLabel: "Case study sections",
    progressLabel: "§1 OF 8",
    railNote: "the rail tracks where you are",
    sections: [
      {
        id: "s1",
        number: "§1",
        tocLabel: "SUMMARY",
        heading: "THE SHORT VERSION",
        body: "I got into RAG out of curiosity, and a friend studying finance handed me the problem. SEC filings are long and get amended after the fact, so plain vector search happily mixes old and new text. FinDoc pulls filings from EDGAR, splits them into sections, stores embeddings in PostgreSQL/pgvector and searches in passes. Every answer cites the filing it came from.",
        variant: "prose",
      },
      {
        id: "s2",
        number: "§2",
        tocLabel: "THE PROBLEM",
        heading: "THE PROBLEM, DRAWN",
        body: "An annual report isn't really one document. A 10-K/A amends specific sections of its parent filing and leaves the rest alone. If you treat the newest file as the truth, you answer from a document that was never complete. If you treat them as separate documents, you end up citing text that's already been revised.",
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
        body: "Ingestion pulls filings from EDGAR, Docling parses them into structured sections, and the chunks get embedded into pgvector along with their filing metadata. Retrieval runs in passes and stops once it has enough evidence. The model only ever sees text it can cite.",
        variant: "prose",
        pipeline: {
          figureNumber: "2",
          caption: "INGESTION → RETRIEVAL → CITED ANSWER",
          captionShort: "INGESTION → CITED ANSWER",
          steps: [
            { title: "EDGAR pull", detail: "Source filing and amendment metadata" },
            { title: "Docling parse", detail: "Structured sections and chunks" },
            { title: "Chunk + embed", detail: "Evidence-sized text with vector embeddings" },
            {
              title: "pgvector + lineage",
              detail: "Embeddings with filing relationships",
              shape: "store",
            },
            {
              title: "Progressive retrieval",
              detail: "Evidence gathered in passes",
              shape: "process",
            },
            { title: "Cited answer", detail: "Claims tied back to filing metadata" },
          ],
        },
        note: "the version sorting happens here, when you ask",
      },
      {
        id: "s4",
        number: "§4",
        tocLabel: "DECISIONS",
        heading: "WHY I BUILT IT THIS WAY",
        variant: "decisions",
        decisions: [
          {
            number: "1",
            heading: "Amendment lineage over latest-wins",
            body: "A 10-K/A only replaces some sections of its parent. So retrieval works out the lineage when you ask instead of at import. It was more work to write, but answers come from the right version. [1]",
            note: "slower queries. I'll take it",
          },
          {
            number: "2",
            heading: "Idempotent imports keyed on accession number",
            body: "Running the same import twice doesn't duplicate anything, so I can backfill or reprocess whenever I want without worrying. [2]",
          },
          {
            number: "3",
            heading: "Progressive retrieval before generation",
            body: "Cheap searches run first, and the expensive ones only kick in when the evidence is thin. It's slower, but the model never has to build an answer out of junk. [3]",
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
          { metric: "Evidence recall @ 6", method: "GOLD SET", result: "0.90" },
          { metric: "Section recall @ 6", method: "GOLD SET", result: "1.00" },
          { metric: "Mean reciprocal rank", method: "GOLD SET", result: "0.92" },
          { metric: "Amendment version accuracy", method: "HARNESS", result: "1.00" },
          { metric: "Cross-team leakage", method: "ISOLATION TEST", result: "0" },
        ],
      },
      {
        id: "s6",
        number: "§6",
        tocLabel: "DEPLOYMENT",
        heading: "DEPLOYMENT",
        body: "FinDoc runs in containers on my K3s cluster on Oracle Cloud, deployed by the setup in the GitOps case study. The only AWS pieces are S3 and SQS. It's meant to be self-hosted, one install per company, and teams can't see each other's files. Not even the admin can. A Redis cache layer is next.",
        variant: "prose",
      },
      {
        id: "s7",
        number: "§7",
        tocLabel: "WHAT CHANGED SINCE V1",
        tocLabelShort: "SINCE V1",
        heading: "WHAT CHANGED SINCE V1",
        body: "v1 used Unstructured.io and Groq on generic, multi-tenant documents. I started generic on purpose so I could get the infrastructure right first. Unstructured ate too much memory and CPU on my OCI box, so v2 moved to Docling, narrowed to SEC filings, and added amendment lineage, citation tracking and retrieval evals. It's still a fairly standard RAG app. Next I want agentic browsing and tools so it can do the math and pull reports itself.",
        variant: "band",
        note: "v3 gets tools. that's the plan anyway",
      },
      {
        id: "s8",
        number: "§8",
        tocLabel: "CONCLUSION",
        heading: "CONCLUSION",
        body: "Calling the model was the easy part. Most of my time went into deciding what counts as evidence and making sure every answer points back to it. When there isn't enough, FinDoc says so.",
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
      title: "FinDoc: Cited Answers from SEC Filings | Daniel Thomas Jesudoss",
      description:
        "FinDoc is a RAG app that answers questions about SEC filings with citations, amendments included. Built with Spring Boot, pgvector and Next.js.",
      openGraph: {
        title: "FinDoc: Cited Answers from SEC Filings | Daniel Thomas Jesudoss",
        description:
          "FinDoc is a RAG app that answers questions about SEC filings with citations, amendments included. Built with Spring Boot, pgvector and Next.js.",
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
    deck: "My own Kubernetes cluster on Oracle Cloud's free tier, defined in Git from the first boot to every deploy.",
    metadata: [
      { label: "ROLE", value: "Built and run it solo" },
      { label: "TIMELINE", value: "Feb 2026 — ongoing", valueShort: "2026 — ongoing" },
      { label: "STACK", value: "K3s · FluxCD · OCI" },
      { label: "SCOPE", value: "Hosts two live sites" },
    ],
    tocLabel: "ON THIS PAGE",
    tocLabelShort: "ON THIS PAGE · 7 SECTIONS",
    tocOpenLabel: "SHOW TABLE OF CONTENTS",
    tocCloseLabel: "HIDE TABLE OF CONTENTS",
    tocNavLabel: "Case study table of contents",
    railNavLabel: "Case study sections",
    progressLabel: "§1 OF 7",
    railNote: "push to git, flux does the rest",
    sections: [
      {
        id: "s1",
        number: "§1",
        tocLabel: "SUMMARY",
        heading: "THE SHORT VERSION",
        body: "My portfolio used to sit in a public S3 bucket, which got limiting fast. I moved to Oracle Cloud's free ARM tier to manage a real server, and I didn't want to SSH in for every change. After I create the VM, a generated cloud-init script installs K3s, sets up Infisical for secrets and hands control to FluxCD. From then on Flux keeps the cluster matching Git, so every change is a commit I can review or roll back.",
        variant: "prose",
      },
      {
        id: "s2",
        number: "§2",
        tocLabel: "THE PLATFORM",
        heading: "THE PLATFORM",
        body: "The cluster handles two jobs. It sets up a fresh VM with no manual steps, and it owns ingress, TLS, deployments, network policy and secret references from Git. It hosts this portfolio at danycb.com and FinDoc at doc-analyzer.danycb.com.",
        bodyAfter:
          "FinDoc has a lot of moving parts: Spring Boot, Next.js, pgvector, a document parser, AWS S3 and SQS, and LLM inference. The GitOps repo is everything around it that keeps it running.",
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
        body: "The platform has three layers: cluster compute, GitOps reconciliation and app workloads. Controllers and config are split on purpose. cert-manager's CRDs have to exist before a ClusterIssuer can be applied, and the Infisical operator has to be running before any InfisicalSecret resources reconcile.",
        bodyAfter:
          "One wildcard certificate covers *.danycb.com and the apex domain, issued by Let's Encrypt over DNS-01 with Cloudflare. Secrets come from Infisical Cloud through Kubernetes-native auth, and no app secrets live in Git.",
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
            {
              title: "Data layer",
              detail: "Keep pgvector and parser traffic internal",
              shape: "store",
            },
          ],
        },
      },
      {
        id: "s4",
        number: "§4",
        tocLabel: "DECISIONS",
        heading: "WHY I PICKED WHAT I PICKED",
        headingShort: "WHY I PICKED\nWHAT I PICKED",
        variant: "decisions",
        decisions: [
          {
            number: "1",
            heading: "FluxCD over Argo CD",
            body: "Flux image automation polls GHCR, picks images by policy, commits the tag update and triggers the redeploy, all in one loop. It's also lighter than Argo CD, which matters on a small single-node cluster. The catch is that fluxcdbot commits and alphabetical tag ordering are now part of how I run it. [1]",
          },
          {
            number: "2",
            heading: "K3s with Traefik disabled, then re-owned by Flux",
            body: "K3s ships with Traefik, but two owners for one controller means conflicts. I disable the bundled one so Flux owns it outright. The cost is a short window with no ingress during a clean bootstrap.",
          },
          {
            number: "3",
            heading: "Infisical over sealed secrets or SOPS",
            body: "The operator signs in with the cluster's own Kubernetes identity, so there are no static credentials to leak. If Infisical goes down for a bit, secret rotation waits, but pods that are already running keep going.",
          },
          {
            number: "4",
            heading: "Gateway API and DNS-01 wildcard TLS",
            body: "Gateway API is the only Traefik routing provider I turn on. DNS-01 handles wildcards without an HTTP challenge endpoint, so one certificate covers every subdomain I have now and any I add later.",
          },
        ],
      },
      {
        id: "s5",
        number: "§5",
        tocLabel: "BOOTSTRAP",
        heading: "THE BOOTSTRAP CHICKEN-AND-EGG PROBLEM",
        headingShort: "THE BOOTSTRAP\nPROBLEM",
        body: "I wanted to be able to move this whole setup to another cloud someday, and that's where the loop came from. Flux needs an SSH key to reach GitHub, the key lives in Infisical, and Infisical needs a running cluster. Cloud-init splits it in two: K3s plus just enough Infisical to fetch the key, then Flux takes over. A couple of bugs are probably still hiding in there until I actually move.",
        bodyAfter:
          "App images follow a similar loop. CI pushes to GHCR, Flux image automation finds a tag the policy allows, commits that version to Git, and Flux rolls it out.",
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
        body: "Here are the limits, up front. It's one OCI node, so a reboot or maintenance window takes everything down. pgvector sits on K3s local-path storage with no backups, so a dead node means lost embeddings and metadata. Under full load, the parser and the database fight over a small CPU budget.",
        bodyAfter:
          "Still on the security to-do list: pod security contexts, resource limits for the FinDoc frontend, and locking down the K3s API server, which is exposed to the internet right now.",
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
        body: "The to-do list: run run-verify.sh as a pull-request check in GitHub Actions, fix image-tag ordering with zero-padded counts, add a pgvector backup, set pod security contexts, turn on Helm drift detection and add some lightweight monitoring. It's live and serving real traffic, and I know where it's weak.",
        variant: "band",
        note: "it's live. it's also one node. both true",
      },
    ],
    evaluationHeaders: ["OPERATING DETAIL", "CURRENT VALUE", "IMPLICATION"],
    notesLabel: "NOTES",
    notes: [
      "[1] Flux owns image updates and reconciliation after bootstrap.",
      "[2] The controller-to-configuration split prevents CRD ordering failures on cold start.",
      "[3] The single node and local-path storage are still the biggest risks.",
    ],
    nextLabel: "NEXT CASE STUDY",
    backToTopLabel: "BACK TO TOP ↑",
    next: {
      slug: "findoc",
      label: "FINDOC →",
      href: "/work/findoc",
    },
    seo: {
      title: "Portfolio GitOps: K3s and FluxCD on Oracle Cloud | Daniel Thomas Jesudoss",
      description:
        "How I run a single-node K3s cluster on Oracle Cloud, fully defined in Git with FluxCD, Infisical and Traefik. Hosts danycb.com and FinDoc.",
      openGraph: {
        title: "Portfolio GitOps: K3s and FluxCD on Oracle Cloud | Daniel Thomas Jesudoss",
        description:
          "How I run a single-node K3s cluster on Oracle Cloud, fully defined in Git with FluxCD, Infisical and Traefik. Hosts danycb.com and FinDoc.",
        type: "article",
      },
    },
  },
} as const satisfies Record<string, CaseStudy>;

export type CaseStudySlug = keyof typeof caseStudies;
