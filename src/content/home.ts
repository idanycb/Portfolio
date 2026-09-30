export type LinkTarget = {
  label: string;
  labelShort?: string;
  href: string;
  hrefMobile?: string;
  external?: boolean;
  download?: boolean;
};

export type ContactTopic = "role" | "collaboration" | "other";

export type ContactFormContent = {
  heading: string;
  fields: {
    name: { label: string };
    email: { label: string };
    topic: { label: string };
    message: { label: string };
  };
  topics: readonly { value: ContactTopic; label: string }[];
  submitLabel: string;
  pendingLabel: string;
  successMessage: string;
  validationErrorMessage: string;
  genericErrorMessage: string;
  rateLimitMessage: string;
  fieldErrors: {
    name: string;
    email: string;
    disposableEmail: string;
    unreachableEmail: string;
    topic: string;
    message: string;
  };
};

export type WorkProject = {
  slug: string;
  number: string;
  category: string;
  categoryShort?: string;
  title: readonly string[];
  titleShort?: readonly string[];
  body: string;
  bodyShort?: string;
  facts: readonly { label: string; body: string; bodyShort?: string }[];
  stack: string;
  stackShort?: string;
  figureLabel: string;
  figureCaption: string;
  figureCaptionShort?: string;
  actions: readonly LinkTarget[];
};

export type ExperienceItem = {
  dates: string;
  datesShort?: string;
  meta?: string;
  metaShort?: string;
  organization: string;
  role: string;
  roleShort?: string;
  body?: string;
  bodyShort?: string;
  stack?: string;
};

export type HomepageContent = {
  profile: {
    name: string;
    wordmark: string;
    role: string;
    location: string;
    headerMeta: string;
    headerMetaShort: string;
    email: string;
    website: string;
    social: readonly LinkTarget[];
  };
  navigation: readonly {
    number: string;
    label: string;
    labelShort?: string;
    href: `#${string}`;
  }[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    education: string;
    skills: readonly string[];
    actions: readonly LinkTarget[];
    image: { src: string; alt: string; sizes: string; aspectRatio: string };
    captionLeft: string;
    captionRight: string;
    notes: { start: string; portrait: string };
  };
  work: {
    heading: string;
    headingShort?: string;
    meta: string;
    projects: readonly WorkProject[];
    notes: { findoc: string; gitops: string };
  };
  experience: {
    heading: string;
    headingShort?: string;
    range: string;
    items: readonly ExperienceItem[];
    certifications: string;
    note: string;
  };
  stack: {
    heading: string;
    meta: string;
    tiers: readonly { number: string; label: string; body: string; bodyShort?: string }[];
    note: string;
    noteShort: string;
  };
  archive: {
    heading: string;
    meta: string;
    projects: readonly {
      year: string;
      title: string;
      titleShort?: string;
      stack: string;
      stackShort?: string;
      href: string;
    }[];
    note: string;
  };
  contact: {
    label: string;
    heading: string;
    body: string;
    form: ContactFormContent;
    actions: readonly LinkTarget[];
    note: string;
  };
  footer: {
    description: string;
    siteLabel: string;
    socialLabel: string;
    socialLabelShort: string;
    directLabel: string;
  };
};

export const homeContent = {
  profile: {
    name: "Daniel Thomas Jesudoss",
    wordmark: "DANY.",
    role: "Backend & AI Software Engineer",
    location: "Dallas–Fort Worth",
    headerMeta: "DANIEL THOMAS JESUDOSS · DALLAS–FORT WORTH",
    headerMetaShort: "BACKEND & AI ENGINEER · DFW",
    email: "idanycb@gmail.com",
    website: "https://www.danycb.com",
    social: [
      {
        label: "LINKEDIN /IN/DANYCB ↗",
        labelShort: "LINKEDIN ↗",
        href: "https://www.linkedin.com/in/danycb",
        external: true,
      },
      {
        label: "GITHUB @IDANYCB ↗",
        labelShort: "GITHUB ↗",
        href: "https://github.com/idanycb",
        external: true,
      },
    ],
  },
  navigation: [
    { number: "01", label: "WORK", labelShort: "SELECTED WORK", href: "#work" },
    { number: "02", label: "EXPERIENCE", href: "#experience" },
    { number: "03", label: "SKILLS", labelShort: "THE STACK", href: "#stack" },
    { number: "04", label: "ARCHIVE", labelShort: "THE ARCHIVE", href: "#archive" },
    { number: "05", label: "CONTACT", href: "#contact" },
  ],
  hero: {
    eyebrow: "HEY, I'M",
    title: "DANY.",
    subtitle: "Backend & AI Software Engineer",
    body: "I build reliable Java/Spring systems, RAG pipelines, and cloud-native applications.",
    education: "MS Computer Science @ UT Arlington. Experienced across",
    skills: ["JAVA", "SPRING BOOT", "RAG", "POSTGRESQL", "AWS", "NEXT.JS", "KUBERNETES"],
    actions: [
      { label: "VIEW PROJECTS ↗", href: "#work" },
      { label: "DOWNLOAD RÉSUMÉ ↓", href: "/daniel-thomas-jesudoss-resume.pdf", download: true },
      { label: "CONTACT ME", href: "#contact", hrefMobile: "#contact" },
    ],
    image: {
      src: "/images/dany-portrait.png",
      alt: "Grayscale portrait of Daniel Thomas Jesudoss wearing glasses, with headphones around his neck",
      sizes:
        "(min-width: 960px) min(34vw, 28rem), (min-width: 640px) 44vw, min(calc(100vw - 40px), 24rem)",
      aspectRatio: "4 / 5",
    },
    captionLeft: "DANY C.B.",
    captionRight: "DALLAS–FORT WORTH",
    notes: {
      start: "start here",
      portrait: "I draw the system before I build it — every diagram here is mine",
    },
  },
  work: {
    heading: "SELECTED WORK",
    headingShort: "SELECTED\nWORK",
    meta: "TWO PROJECTS · SHOWN IN FULL",
    projects: [
      {
        slug: "findoc",
        number: "01",
        figureLabel: "FIG. 1",
        figureCaption: "INGESTION → RETRIEVAL → CITED ANSWER",
        figureCaptionShort: "INGESTION → CITED ANSWER",
        category: "AI / BACKEND · RETRIEVAL",
        title: ["FINDOC"],
        body: "Financial filings are long, amended over time, and hostile to naïve retrieval. FinDoc imports SEC EDGAR filings, parses and indexes their structured sections, retrieves progressively, and answers only with citations tied back to filing metadata.",
        bodyShort:
          "Financial filings are long, amended over time, and hostile to naïve retrieval. FinDoc imports SEC EDGAR filings, indexes their structured sections, retrieves progressively, and answers only with citations tied back to filing metadata.",
        facts: [
          {
            label: "AMENDMENTS",
            body: "A 10-K/A supersedes parts of its parent. Lineage resolves at query time.",
          },
          {
            label: "IMPORTS",
            body: "Idempotent, keyed on accession number — backfills are free.",
          },
          {
            label: "GROUNDING",
            body: "No citation, no answer. Sub-100 ms vector search, evaluated not asserted.",
          },
        ],
        stack:
          "JAVA 21 · SPRING BOOT · POSTGRESQL/PGVECTOR · DOCLING · LANGCHAIN4J · AWS · NEXT.JS",
        actions: [
          { label: "READ THE CASE STUDY ↗", href: "/work/findoc" },
          {
            label: "LIVE DEMO",
            href: "https://doc-analyzer.danycb.com",
            external: true,
          },
        ],
      },
      {
        slug: "portfolio-gitops",
        number: "02",
        figureLabel: "FIG. 2",
        figureCaption: "THE RECONCILIATION LOOP",
        category: "DEVOPS · PLATFORM",
        title: ["PORTFOLIO", "GITOPS"],
        body: "A private K3s cluster on Oracle Cloud ARM, declared entirely in Git. FluxCD reconciles, Infisical holds the secrets under zero-trust, cert-manager and Traefik keep it public and encrypted. Bootstrap is two-phase and documented — after it, nothing is done by hand.",
        bodyShort:
          "A private K3s cluster on Oracle Cloud ARM, declared entirely in Git. FluxCD reconciles, Infisical holds the secrets under zero-trust, cert-manager and Traefik keep it public and encrypted. After bootstrap, nothing is done by hand.",
        facts: [
          {
            label: "DECLARED",
            body: "Git is the only source of truth. Drift is corrected, not debugged.",
          },
          {
            label: "SECRETS",
            body: "Zero-trust management — nothing sensitive lives in the repo.",
          },
        ],
        stack: "K3S · FLUXCD · INFISICAL · CERT-MANAGER · TRAEFIK · OCI · GITHUB ACTIONS",
        actions: [
          { label: "READ THE CASE STUDY ↗", href: "/work/portfolio-gitops" },
          {
            label: "REPO",
            href: "https://github.com/idanycb/portfolio-gitops",
            external: true,
          },
        ],
      },
    ],
    notes: {
      findoc: "the amendment trail is the hard part — not the model call.",
      gitops: "this website is deployed by the thing this case study describes",
    },
  },
  experience: {
    heading: "EXPERIENCE & EDUCATION",
    headingShort: "EXPERIENCE &\nEDUCATION",
    range: "2020 — 2026",
    items: [
      {
        dates: "SEP — NOV 2022",
        datesShort: "SEP — NOV 2022 · VIRTUAL",
        meta: "3 MONTHS · VIRTUAL",
        organization: "IBM",
        role: "FRONTEND DEVELOPMENT INTERN",
        roleShort: "FRONTEND DEV INTERN",
        body: "Selected for a competitive three-month virtual internship under the IBM SkillsBuild Program. Designed and built a web application from the ground up — responsive, cross-browser layouts with clean component structure and semantic markup — working to iterative development, code review and milestone-based delivery.",
        bodyShort:
          "Selected for a competitive three-month virtual internship under IBM SkillsBuild. Built a web application from the ground up — responsive, cross-browser layouts with clean component structure — to iterative review and milestone delivery.",
        stack: "IBM SKILLSBUILD · FRONTEND · CODE REVIEW · MILESTONE DELIVERY",
      },
      {
        dates: "AUG 2024 — MAY 2026",
        datesShort: "AUG 2024 — MAY 2026 · GPA 3.7",
        meta: "GPA 3.7",
        organization: "THE UNIVERSITY OF TEXAS AT ARLINGTON",
        role: "MS COMPUTER SCIENCE",
        body: "Graduate coursework in distributed systems, machine learning and databases — the foundation under everything above.",
        bodyShort: "Graduate coursework in distributed systems, machine learning and databases.",
      },
      {
        dates: "JUN 2020 — APR 2024",
        datesShort: "JUN 2020 — APR 2024 · CHENNAI, INDIA",
        meta: "CHENNAI, INDIA",
        organization: "LOYOLA-ICAM COLLEGE OF ENGINEERING & TECHNOLOGY",
        role: "BTECH INFORMATION TECHNOLOGY",
      },
    ],
    certifications:
      "ARCHITECTING WITH GOOGLE COMPUTE ENGINE · THE BITS AND BYTES OF COMPUTER NETWORKING · FOUNDATIONS OF PROJECT MANAGEMENT · ADVANCE YOUR SKILLS IN JAVASCRIPT",
    note: "my first real code review",
  },
  stack: {
    heading: "THE STACK",
    meta: "FOUR TIERS · ORDERED BY PRODUCTION DEPTH",
    tiers: [
      {
        number: "01",
        label: "PRIMARY",
        body: "JAVA · SPRING BOOT · POSTGRESQL / PGVECTOR · RAG · LANGCHAIN4J · AWS",
      },
      {
        number: "02",
        label: "PRODUCT DELIVERY",
        body: "TYPESCRIPT · REACT · NEXT.JS · REST APIS · RESPONSIVE UI",
      },
      {
        number: "03",
        label: "INFRASTRUCTURE",
        body: "DOCKER · KUBERNETES / K3S · FLUXCD · CI/CD · ORACLE CLOUD",
      },
      { number: "04", label: "ADDITIONAL", body: "PYTHON · C / C++ · GO · CUDA" },
    ],
    note: "ordered by how much of it I've actually run in production — honest, not flattering.",
    noteShort:
      "ordered by how much of it I've actually run in production — honest, not flattering.",
  },
  archive: {
    heading: "THE ARCHIVE",
    meta: "2021 — 2023 · STUDENT WORK, KEPT HONESTLY",
    projects: [
      {
        year: "2023",
        title: "SPACEX CLONE",
        stack: "GATSBY · TYPESCRIPT ↗",
        stackShort: "GATSBY · TS ↗",
        href: "https://dany-cb.github.io/Clone_SpaceX/",
      },
      {
        year: "2023",
        title: "G-LEARNER",
        stack: "NEXT.JS · PYTHON · AI ↗",
        href: "https://github.com/dany-cb/g-learner",
      },
      {
        year: "2023",
        title: "FLAIR 2K23",
        titleShort: "FLAIR\n2K23",
        stack: "NEXT.JS · SCSS ↗",
        href: "https://flair2k23.vercel.app/",
      },
      {
        year: "2022",
        title: "FLAIR 2K22",
        titleShort: "FLAIR\n2K22",
        stack: "REACT · SCSS ↗",
        href: "https://flair2k22.vercel.app/",
      },
    ],
    note: "kept because they show the road, not the destination.",
  },
  contact: {
    label: "§5 — CONTACT",
    heading: "LET'S\nBUILD\nSOMETHING.",
    body: "Open to backend, AI-platform and full-stack roles — Dallas–Fort Worth and remote.",
    form: {
      heading: "GET IN TOUCH",
      fields: {
        name: { label: "NAME" },
        email: { label: "EMAIL" },
        topic: { label: "WHAT'S THIS ABOUT?" },
        message: { label: "MESSAGE" },
      },
      topics: [
        { value: "role", label: "ROLE" },
        { value: "collaboration", label: "COLLABORATION" },
        { value: "other", label: "OTHER" },
      ],
      submitLabel: "SEND MESSAGE ↗",
      pendingLabel: "SENDING…",
      successMessage: "MESSAGE SENT — I'LL GET BACK TO YOU SOON.",
      validationErrorMessage: "CHECK THE MARKED FIELDS AND TRY AGAIN.",
      genericErrorMessage: "SOMETHING WENT WRONG. TRY AGAIN OR EMAIL IDANYCB@GMAIL.COM DIRECTLY.",
      rateLimitMessage: "TOO MANY MESSAGES. TRY AGAIN IN 10 MINUTES OR EMAIL ME DIRECTLY.",
      fieldErrors: {
        name: "ENTER YOUR NAME.",
        email: "ENTER A VALID EMAIL ADDRESS.",
        disposableEmail: "USE A PERMANENT EMAIL ADDRESS.",
        unreachableEmail: "THIS EMAIL DOMAIN CANNOT RECEIVE MAIL.",
        topic: "CHOOSE ROLE, COLLABORATION, OR OTHER.",
        message: "MESSAGE MUST BE BETWEEN 10 AND 5000 CHARACTERS.",
      },
    },
    actions: [
      { label: "DOWNLOAD RÉSUMÉ ↓", href: "/daniel-thomas-jesudoss-resume.pdf", download: true },
      {
        label: "IDANYCB@GMAIL.COM ↗",
        href: "mailto:idanycb@gmail.com",
      },
    ],
    note: "I read every one",
  },
  footer: {
    description:
      "Daniel Thomas Jesudoss — backend & AI software engineer. Dallas–Fort Worth Metroplex.",
    siteLabel: "SITE",
    socialLabel: "PROFESSIONAL",
    socialLabelShort: "ELSEWHERE",
    directLabel: "DIRECT",
  },
} as const satisfies HomepageContent;

export type HomeContent = typeof homeContent;
