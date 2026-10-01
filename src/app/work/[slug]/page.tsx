import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { caseStudies, type CaseStudySlug } from "@/content/case-studies";
import { homeContent } from "@/content/home";
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

  const path = `/work/${caseStudy.slug}`;

  return {
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    alternates: { canonical: path },
    // Child openGraph replaces the root one wholesale, so restate the shared fields.
    openGraph: {
      ...caseStudy.seo.openGraph,
      url: path,
      siteName: homeContent.profile.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: caseStudy.seo.title,
      description: caseStudy.seo.description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return <CaseStudyPage caseStudy={caseStudy} />;
}
