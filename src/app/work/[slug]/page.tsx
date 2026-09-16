import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { caseStudies, type CaseStudySlug } from "@/content/case-studies";
import { CaseStudyPage } from "@/features/case-study/design/CaseStudyPage";

type Props = { params: Promise<{ slug: string }> };

function getCaseStudy(slug: string) {
  return Object.hasOwn(caseStudies, slug) ? caseStudies[slug as CaseStudySlug] : undefined;
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return {
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    openGraph: caseStudy.seo.openGraph,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return <CaseStudyPage caseStudy={caseStudy} />;
}
