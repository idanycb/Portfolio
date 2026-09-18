import type { CaseStudy } from "@/content/case-studies";
import { PageDrawnLayer } from "@/shared/drawn-layer/PageDrawnLayer";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SiteContainer } from "@/shared/site-container";
import { SiteHeader } from "@/shared/site-header";
import Link from "next/link";

import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyNav } from "./CaseStudyNav";
import { CaseStudySection } from "./CaseStudySection";
import { CaseStudyToc } from "./CaseStudyToc";

export function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const navigation = caseStudy.sections.map((section) => ({
    href: `#${section.id}`,
    label: section.tocLabel,
    labelShort: section.tocLabelShort,
  }));

  return (
    <div id="top" className="bg-paper text-ink min-h-[100dvh]">
      <PageDrawnLayer />
      <SiteHeader
        variant="case-study"
        caseStudyLabel={caseStudy.issueLabel}
        backLabel={caseStudy.backLabel}
        backLabelShort={caseStudy.backLabelShort}
        progressLabel={caseStudy.progressLabel}
      />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyHero caseStudy={caseStudy} />
        <CaseStudyToc
          items={navigation}
          label={caseStudy.tocLabel}
          labelShort={caseStudy.tocLabelShort}
          openLabel={caseStudy.tocOpenLabel}
          closeLabel={caseStudy.tocCloseLabel}
          navLabel={caseStudy.tocNavLabel}
        />
        <SiteContainer className="layout:grid layout:grid-cols-[14.375rem_minmax(0,1fr)] layout:px-0">
          <CaseStudyNav
            items={navigation}
            label={caseStudy.tocLabel}
            navLabel={caseStudy.railNavLabel}
            note={caseStudy.railNote}
          />
          <article className="min-w-0 px-5 py-[2.375rem] layout:px-12 layout:py-[3.25rem]">
            <div className="space-y-14 layout:space-y-[4.75rem]">
              {caseStudy.sections.map((section) => (
                <CaseStudySection
                  key={section.id}
                  section={section}
                  evaluationHeaders={caseStudy.evaluationHeaders}
                />
              ))}
            </div>
            <aside
              className="border-ink mt-14 border-t-[1.5px] pt-4"
              aria-label={caseStudy.notesLabel}
            >
              <p className="text-muted font-mono text-xs font-bold tracking-[0.16em]">
                {caseStudy.notesLabel}
              </p>
              <ul className="text-copy-muted mt-3 space-y-2 font-mono text-xs leading-5 tracking-[0.04em]">
                {caseStudy.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </aside>
          </article>
        </SiteContainer>
      </main>
      <footer className="bg-ink-dark text-paper">
        <SiteContainer className="flex flex-col gap-8 py-8 layout:flex-row layout:items-end layout:justify-between layout:py-[2.125rem]">
          <div>
            <span className="text-inverse-muted font-mono text-xs tracking-[0.16em]">
              {caseStudy.nextLabel}
            </span>
            <Link
              href={caseStudy.next.href}
              className="font-display text-paper hover:text-inverse-muted mt-2 block text-3xl leading-[0.95] font-black tracking-[-0.055em] whitespace-pre-line layout:text-4xl"
            >
              <ResponsiveCopy long={caseStudy.next.label} short={caseStudy.next.labelShort} />
            </Link>
          </div>
          <Link
            href="#top"
            className="text-inverse-muted hover:text-paper flex min-h-11 w-fit items-center font-mono text-xs tracking-[0.16em]"
          >
            {caseStudy.backToTopLabel}
          </Link>
        </SiteContainer>
      </footer>
    </div>
  );
}
