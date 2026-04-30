import type { StaticImageData } from "next/image";

import flair2k22Image from "@/assets/images/projects/flair-2k22.jpeg";
import flair2k23Image from "@/assets/images/projects/flair-2k23.jpeg";
import gLearnerImage from "@/assets/images/projects/g-learner.png";
import placeholderProjectImage from "@/assets/images/projects/job-jive.png";
import spacexImage from "@/assets/images/projects/spacex.jpeg";
import portfoliogitopsImage from "@assets/images/projects/portfolio-gitops.png";
import ragworkspaceImage from "@assets/images/projects/rag-workspace.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type SpotlightProjectT = {
  id: number;
  titleLines: string[];
  category: string;
  description: string;
  role: string;
  duration: string;
  stackDisplay: string;
  tags: string[];
  caseStudySlug: string;
  repoURL: string;
  demoURL?: string;
  image: StaticImport;
};

export type OtherProjectT = {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
  tags: string[];
  stackDisplay: string;
  category: string;
  repoURL: string;
  demoURL?: string;
};

export const spotlightProjects: SpotlightProjectT[] = [
  {
    id: 1,
    titleLines: ["RAG", "WORKSPACE"],
    category: "AI / Full-Stack",
    image: ragworkspaceImage,
    description:
      "A multi-tenant document intelligence platform that turns complex PDFs into a queryable knowledge vault. Handles direct S3 uploads, asynchronous OCR processing, local embeddings, tenant-isolated pgvector storage, and a multi-stage RAG pipeline for grounded answers with citations.",
    role: "Full-Stack Eng.",
    duration: "3 Months",
    stackDisplay: "Spring Boot · Next.js · AWS",
    tags: ["Spring Boot", "Next.js", "RAG", "PgVector", "AWS", "PostgreSQL"],
    caseStudySlug: "rag-workspace",
    repoURL: "https://github.com/idanycb/findoc-rag",
    demoURL: "https://doc-analyzer.danycb.tech",
  },
  {
    id: 2,
    titleLines: ["PORTFOLIO", "GITOPS"],
    category: "DevOps / Infrastructure",
    image: portfoliogitopsImage,
    description:
      "A declarative GitOps repository for provisioning and operating a production K3s cluster on Oracle Cloud Infrastructure. Uses FluxCD, Infisical, cert-manager, and Traefik for self-healing infrastructure with zero manual SSH workflow after bootstrap.",
    role: "DevOps Lead",
    duration: "Ongoing",
    stackDisplay: "K3s · FluxCD · OCI",
    tags: ["Kubernetes", "FluxCD", "K3s", "OCI", "Infisical", "GitOps"],
    caseStudySlug: "portfolio-gitops",
    repoURL: "https://github.com/idanycb/portfolio-gitops",
  },
];

export const otherProjects: OtherProjectT[] = [
  {
    id: 3,
    title: "SpaceX Clone",
    image: spacexImage,
    description:
      "A clone of the SpaceX website built with Gatsby and TypeScript. Features responsive design and modern UI components.",
    tags: ["Gatsby", "TypeScript", "React", "CSS"],
    stackDisplay: "Gatsby · TypeScript · React",
    category: "Web Dev",
    repoURL: "https://github.com/dany-cb/Clone_SpaceX",
    demoURL: "https://dany-cb.github.io/Clone_SpaceX/",
  },
  {
    id: 4,
    title: "G-Learner",
    image: gLearnerImage,
    description:
      "A smart learning portal that continuously gathers YouTube educational videos and ranks them against user-entered topics to streamline self-study. Features a real-time NLP pipeline and a feed-forward ANN to instantly map user queries to the highest-relevance videos.",
    tags: ["Next.js", "TypeScript", "Python", "AI", "Prisma"],
    stackDisplay: "Next.js · Python · AI",
    category: "AI / ML",
    repoURL: "https://github.com/dany-cb/g-learner",
  },
  {
    id: 5,
    title: "Flair 2k23",
    image: flair2k23Image,
    description:
      "A college event website built with Next.js, JavaScript, and TypeScript. Features event registration, schedule viewing, and interactive UI.",
    tags: ["Next.js", "TypeScript", "JavaScript", "CSS", "SCSS"],
    stackDisplay: "Next.js · TypeScript · SCSS",
    category: "Web Dev",
    repoURL: "https://github.com/dany-cb/flair2k23v2",
    demoURL: "https://flair2k23.vercel.app/",
  },
  {
    id: 6,
    title: "Flair 2k22",
    image: flair2k22Image,
    description:
      "A college event website built with React, JavaScript, and TypeScript. Features event registration, schedule viewing, and interactive UI.",
    tags: ["React", "TypeScript", "SCSS", "JavaScript", "HTML"],
    stackDisplay: "React · TypeScript · SCSS",
    category: "Web Dev",
    repoURL: "https://github.com/dany-cb/Flair2k22",
    demoURL: "https://flair2k22.vercel.app/",
  },
];

// Legacy type and array — used by ProjectList / ProjectModal
export type ProjectT = {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
  tags: string[];
  repoURL: string;
  demoURL?: string;
};

export const projects: ProjectT[] = [
  {
    id: 1,
    title: "RAG Workspace",
    image: placeholderProjectImage,
    description:
      "A multi-tenant document intelligence platform that turns complex PDFs into a queryable knowledge vault. Built with Spring Boot and Next.js, it handles direct S3 uploads, asynchronous OCR processing, local embeddings, tenant-isolated pgvector storage, and a multi-stage RAG pipeline for grounded answers with citations.",
    tags: ["Spring Boot", "Next.js", "RAG", "PgVector", "AWS", "PostgreSQL"],
    repoURL: "https://github.com/idanycb/findoc-rag",
    demoURL: "https://doc-analyzer.danycb.tech",
  },
  {
    id: 2,
    title: "Portfolio GitOps",
    image: placeholderProjectImage,
    description:
      "A declarative GitOps repository for provisioning and operating a production K3s portfolio cluster on Oracle Cloud Infrastructure. It uses cloud-init, FluxCD, Infisical, cert-manager, Traefik, and automated image updates to run public applications with self-healing infrastructure and no manual SSH workflow after bootstrap.",
    tags: ["Kubernetes", "FluxCD", "K3s", "OCI", "Infisical", "GitOps"],
    repoURL: "https://github.com/idanycb/portfolio-gitops",
  },
  {
    id: 3,
    title: "SpaceX Clone",
    image: spacexImage,
    description:
      "A clone of the SpaceX website built with Gatsby and TypeScript. Features responsive design and modern UI components.",
    tags: ["Gatsby", "TypeScript", "React", "CSS"],
    repoURL: "https://github.com/dany-cb/Clone_SpaceX",
    demoURL: "https://dany-cb.github.io/Clone_SpaceX/",
  },
  {
    id: 4,
    title: "G-Learner",
    image: gLearnerImage,
    description:
      "A smart learning portal that continuously gathers YouTube educational videos and ranks them against user-entered topics to streamline self-study. Features a real-time NLP pipeline that distills 5-minute transcripts in under 400 ms and utilizes a feed-forward ANN to instantly map user queries to the highest-relevance videos.",
    tags: ["Next.js", "TypeScript", "Python", "AI", "Prisma"],
    repoURL: "https://github.com/dany-cb/g-learner",
  },
  {
    id: 5,
    title: "Flair 2k23",
    image: flair2k23Image,
    description:
      "A college event website built with Next.js, JavaScript, and TypeScript. Features event registration, schedule viewing, and interactive UI.",
    tags: ["Next.js", "TypeScript", "JavaScript", "CSS", "SCSS"],
    repoURL: "https://github.com/dany-cb/flair2k23v2",
    demoURL: "https://flair2k23.vercel.app/",
  },
  {
    id: 6,
    title: "Flair 2k22",
    image: flair2k22Image,
    description:
      "A college event website built with React, JavaScript, and TypeScript. Features event registration, schedule viewing, and interactive UI.",
    tags: ["React", "TypeScript", "SCSS", "JavaScript", "HTML"],
    repoURL: "https://github.com/dany-cb/Flair2k22",
    demoURL: "https://flair2k22.vercel.app/",
  },
];
