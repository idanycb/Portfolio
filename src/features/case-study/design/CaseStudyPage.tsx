import type { CaseStudy } from "@/content/case-studies";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SiteContainer } from "@/shared/site-container";
import { SiteHeader } from "@/shared/site-header";
import Link from "next/link";

import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyNav } from "./CaseStudyNav";
import { CaseStudySection } from "./CaseStudySection";
import { CaseStudyToc } from "./CaseStudyToc";

export function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const navigation = caseStudy.sections.map((section) => ({ href: `#${section.id}`, label: section.tocLabel, labelShort: section.tocLabelShort }));

  return (
    <div id="top" className="min-h-[100dvh] bg-paper text-ink">
      <SiteHeader variant="case-study" caseStudyLabel={caseStudy.issueLabel} backLabel={caseStudy.backLabel} backLabelShort={caseStudy.backLabelShort} progressLabel={caseStudy.progressLabel} />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyHero caseStudy={caseStudy} />
        <CaseStudyToc items={navigation} label={caseStudy.tocLabel} labelShort={caseStudy.tocLabelShort} openLabel={caseStudy.tocOpenLabel} closeLabel={caseStudy.tocCloseLabel} navLabel={caseStudy.tocNavLabel} />
        <SiteContainer className="md:grid md:grid-cols-[14.375rem_minmax(0,1fr)] md:px-0">
          <CaseStudyNav items={navigation} label={caseStudy.tocLabel} navLabel={caseStudy.railNavLabel} />
          <article className="min-w-0 px-5 py-[2.375rem] md:px-12 md:py-[3.25rem]">
            <div className="space-y-14 md:space-y-[4.75rem]">
              {caseStudy.sections.map((section) => <CaseStudySection key={section.id} section={section} evaluationHeaders={caseStudy.evaluationHeaders} />)}
            </div>
            <aside className="mt-14 border-t-[1.5px] border-ink pt-4" aria-label={caseStudy.notesLabel}>
              <p className="font-mono text-[0.625rem] font-bold tracking-[0.16em] text-muted">{caseStudy.notesLabel}</p>
              <ul className="mt-3 space-y-2 font-mono text-[0.6875rem] leading-5 tracking-[0.04em] text-copy-muted">
                {caseStudy.notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </aside>
          </article>
        </SiteContainer>
      </main>
      <footer className="bg-ink-dark text-paper">
        <SiteContainer className="flex flex-col gap-8 py-8 md:flex-row md:items-end md:justify-between md:py-[2.125rem]">
          <div>
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-inverse-muted">{caseStudy.nextLabel}</span>
            <Link href={caseStudy.next.href} className="mt-2 block font-display text-3xl leading-[0.95] font-black tracking-[-0.055em] whitespace-pre-line text-paper hover:text-inverse-muted md:text-4xl">
              <ResponsiveCopy long={caseStudy.next.label} short={caseStudy.next.labelShort} />
            </Link>
          </div>
          <Link href="#top" className="flex min-h-11 w-fit items-center font-mono text-[0.625rem] tracking-[0.16em] text-inverse-muted hover:text-paper">{caseStudy.backToTopLabel}</Link>
        </SiteContainer>
      </footer>
    </div>
  );
}
