type LinkTarget = {
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

type ExperienceItem = {
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
    body: "I build Spring Boot backends and RAG apps, and run them on a Kubernetes cluster I set up.",
    education: "MS Computer Science @ UT Arlington ('26). Stuff I've actually shipped with:",
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
      portrait: "curious guy who codes for fun. the headphones never come off",
    },
  },
  work: {
    heading: "SELECTED WORK",
    headingShort: "SELECTED\nWORK",
    meta: "TWO PROJECTS · BOTH LIVE",
    projects: [
      {
        slug: "findoc",
        number: "01",
        figureLabel: "FIG. 1",
        figureCaption: "INGESTION → RETRIEVAL → CITED ANSWER",
        figureCaptionShort: "INGESTION → CITED ANSWER",
        category: "AI / BACKEND · RETRIEVAL",
        title: ["FINDOC"],
        body: "A friend majoring in finance told me how painful SEC filings are to dig through, so I built FinDoc. It pulls filings from EDGAR, indexes them by section, searches in a few passes and answers with citations back to the exact filing.",
        bodyShort:
          "A friend in finance told me how painful SEC filings are to dig through, so I built FinDoc. It pulls filings from EDGAR, indexes them by section and answers with citations back to the exact filing.",
        facts: [
          {
            label: "AMENDMENTS",
            body: "A 10-K/A only replaces parts of the original. FinDoc works out which version applies when you ask.",
          },
          {
            label: "IMPORTS",
            body: "Imports are keyed on accession number, so running one twice is safe.",
          },
          {
            label: "GROUNDING",
            body: "Every answer needs a citation. Vector search comes back in under 100 ms.",
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
        body: "My site outgrew a public S3 bucket, so I moved to Oracle Cloud's free ARM tier to run a real server. The K3s cluster on it is defined in Git: FluxCD applies whatever I push and Infisical keeps secrets out of the repo. I didn't want to SSH in for every change, and now I don't.",
        bodyShort:
          "My site outgrew a public S3 bucket, so I moved to Oracle Cloud's free ARM tier. The K3s cluster there is defined in Git: FluxCD applies whatever I push and Infisical keeps secrets out of the repo. No more SSHing in for every change.",
        facts: [
          {
            label: "DECLARED",
            body: "If something drifts from Git, Flux puts it back within about ten minutes.",
          },
          {
            label: "SECRETS",
            body: "Secrets live in Infisical. The repo only holds references to them.",
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
      findoc: "the amendments were way harder than the AI part",
      gitops: "the site you're reading was deployed by this exact setup",
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
        body: "Three months in IBM's SkillsBuild program, building an internal web app from scratch on a fixed timeline with milestones and code reviews. I turned design specs into a responsive UI that held up across browsers, with clean components and semantic HTML. It was my first time coding in a real work setup, and I learned a lot from it.",
        bodyShort:
          "Three months in IBM's SkillsBuild program, building an internal web app from scratch with milestones and code reviews. I turned design specs into a responsive UI that worked across browsers.",
        stack: "IBM SKILLSBUILD · FRONTEND · RESPONSIVE UI · CODE REVIEW",
      },
      {
        dates: "AUG 2024 — MAY 2026",
        datesShort: "AUG 2024 — MAY 2026 · GPA 3.9",
        meta: "GPA 3.9",
        organization: "THE UNIVERSITY OF TEXAS AT ARLINGTON",
        role: "MS COMPUTER SCIENCE",
        body: "Graduate coursework in distributed systems, machine learning and databases, while I built the two projects above on the side.",
        bodyShort: "Coursework in distributed systems, machine learning and databases.",
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
    meta: "FOUR TIERS · BY WHAT I'VE SHIPPED",
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
    note: "tiers 01 to 03 run my live sites right now. 04 I know, just haven't shipped with yet.",
    noteShort: "01 to 03 run my live sites. 04 I know, haven't shipped yet.",
  },
  archive: {
    heading: "THE ARCHIVE",
    meta: "2021 — 2023 · OLD STUFF, STILL UP",
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
    note: "the spacex clone was my first real typescript site. be nice",
  },
  contact: {
    label: "§5 — CONTACT",
    heading: "LET'S\nBUILD\nSOMETHING.",
    body: "New grad looking for backend, AI-platform or full-stack roles. Dallas–Fort Worth or remote.",
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
      successMessage: "GOT IT. I'LL GET BACK TO YOU SOON.",
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
      "Daniel Thomas Jesudoss. Backend & AI software engineer, new grad, based in Dallas–Fort Worth.",
    siteLabel: "SITE",
    socialLabel: "PROFESSIONAL",
    socialLabelShort: "ELSEWHERE",
    directLabel: "DIRECT",
  },
} as const satisfies HomepageContent;
