export const selectedWork = {
  findoc: {
    number: "01",
    category: "AI / Backend / Retrieval",
    title: ["FINDOC"],
    description: "Financial filings are long, amended over time, and hostile to naive retrieval. FinDoc imports SEC EDGAR filings, parses and indexes structured sections, retrieves progressively, and answers only with citations tied to filing metadata.",
    details: [["Amendments", "A 10-K/A supersedes parts of its parent. Lineage resolves at query time."], ["Imports", "Idempotent and keyed on accession number, so backfills are safe."], ["Grounding", "No citation, no answer. Retrieval is evaluated, not asserted."]],
    stack: "Java 21, Spring Boot, PostgreSQL and pgvector, Docling, LangChain4j, AWS, Next.js",
    caseStudyHref: "/projects/rag-workspace",
    repoHref: "https://github.com/idanycb/findoc-rag",
    demoHref: "https://doc-analyzer.danycb.com",
  },
  gitops: {
    number: "02",
    category: "DevOps / Platform",
    title: ["PORTFOLIO", "GITOPS"],
    description: "A private K3s cluster on Oracle Cloud ARM, declared entirely in Git. FluxCD reconciles workloads while Infisical holds secrets outside the repository and cert-manager with Traefik keeps the public edge encrypted.",
    details: [["Declared", "Git is the only source of truth. Drift is corrected, not debugged."], ["Secrets", "Zero-trust management keeps sensitive values out of the repository."]],
    stack: "K3s, FluxCD, Infisical, cert-manager, Traefik, OCI, GitHub Actions",
    caseStudyHref: "/projects/portfolio-gitops",
    repoHref: "https://github.com/idanycb/portfolio-gitops",
  },
} as const;
