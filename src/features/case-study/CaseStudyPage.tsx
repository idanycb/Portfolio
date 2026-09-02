import type { ReactNode } from "react";

import { SiteFooter } from "@/shared/site-footer";
import { SiteHeader } from "@/shared/site-header";
import { SiteContainer } from "@/shared/site-container";

import { CaseStudyHero, type CaseStudyHeroProps } from "./CaseStudyHero";
import { CaseStudyRail, type CaseStudyRailItem } from "./CaseStudyRail";

type CaseStudyPageProps = CaseStudyHeroProps & {
  issue: string;
  children: ReactNode;
  contents: readonly CaseStudyRailItem[];
  nextCaseStudy: { href: string; label: string };
  railAnnotation?: ReactNode;
};

export function CaseStudyPage({ children, contents, nextCaseStudy, railAnnotation, issue, ...hero }: CaseStudyPageProps) {
  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <SiteHeader caseStudyLabel={issue} />
      <main>
        <CaseStudyHero {...hero} />
        <SiteContainer className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:px-0">
          <CaseStudyRail items={contents} annotation={railAnnotation} />
          <article className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-12">{children}</article>
        </SiteContainer>
      </main>
      <SiteFooter nextCaseStudy={nextCaseStudy} />
    </div>
  );
}
