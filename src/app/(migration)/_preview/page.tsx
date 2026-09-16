import { ActionLink } from "@/shared/action-link";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SectionHeading } from "@/shared/section-heading";
import { SiteContainer } from "@/shared/site-container";
import { SiteFooter } from "@/shared/site-footer";
import { SiteHeader } from "@/shared/site-header";

// TODO(migration step 6): remove this temporary shared-component preview route.
export default function MigrationComponentPreviewPage() {
  return (
    <div id="top" className="min-h-[100dvh] bg-paper text-ink">
      <SiteHeader />
      <main id="main-content">
        <SiteContainer className="py-11 md:py-16">
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted">
            TEMPORARY MIGRATION PREVIEW · REMOVE IN STEP 6
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[0.9] font-black tracking-[-0.055em] md:text-7xl">
            SHARED FOUNDATION
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-copy">
            This route exercises every shared component at the migration breakpoint and exists only for visual verification.
          </p>

          <section className="scroll-mt-28 pt-16">
            <SectionHeading
              number="§1"
              title="SELECTED WORK"
              titleShort={"SELECTED\nWORK"}
              meta="TWO PROJECTS · SHOWN IN FULL"
            />
            <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:flex-wrap">
              <ActionLink href="#component-copy">SOLID ACTION ↗</ActionLink>
              <ActionLink href="#component-copy" variant="outline">
                OUTLINE ACTION
              </ActionLink>
              <ActionLink href="mailto:idanycb@gmail.com" variant="text">
                TEXT ACTION
              </ActionLink>
            </div>
          </section>

          <section id="component-copy" className="scroll-mt-28 pt-16">
            <SectionHeading
              number="§2"
              title="RESPONSIVE COPY"
              meta="DESKTOP VALUE"
              metaShort="MOBILE VALUE"
            />
            <ResponsiveCopy
              as="p"
              long="This long version appears from the md breakpoint upward."
              short="This short version appears below md."
              className="mt-6 max-w-xl text-base leading-7 text-copy"
            />
          </section>

          <section className="pt-16">
            <SectionHeading
              number="§3"
              title="INVERSE HEADING"
              meta="DARK-SURFACE VARIANT"
              inverse
              className="bg-ink-dark p-6 md:p-10"
            />
          </section>

          <section className="pt-16">
            <p className="mb-3 font-mono text-[0.625rem] tracking-[0.18em] text-muted">
              CASE-STUDY HEADER VARIANT
            </p>
            <div className="border-signature overflow-hidden border-ink">
              <SiteHeader
                variant="case-study"
                caseStudyLabel="CASE STUDY 01 / FINDOC"
                backLabel="← BACK TO THE ISSUE"
                backLabelShort="← THE ISSUE"
              />
            </div>
          </section>
        </SiteContainer>
      </main>
      <SiteFooter />
      <SiteFooter
        variant="case-study"
        nextCaseStudy={{
          href: "/projects/portfolio-gitops",
          label: "PORTFOLIO GITOPS →",
          labelShort: "PORTFOLIO\nGITOPS →",
        }}
      />
    </div>
  );
}
