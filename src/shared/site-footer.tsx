import Link from "next/link";

import { homeContent } from "@/content/home";

import { ResponsiveCopy } from "./responsive-copy";
import { SiteContainer } from "./site-container";

export type SiteFooterProps = {
  variant?: "home" | "case-study";
  nextCaseStudy?: {
    href: string;
    label: string;
    labelShort?: string;
  };
};

export function SiteFooter({ variant, nextCaseStudy }: SiteFooterProps) {
  const isCaseStudy = variant === "case-study" || Boolean(nextCaseStudy);

  if (isCaseStudy && nextCaseStudy) {
    return (
      <footer className="bg-ink-dark text-paper">
        <SiteContainer className="flex flex-col gap-8 py-8 layout:flex-row layout:items-end layout:justify-between layout:py-[2.125rem]">
          <div>
            <span className="font-mono text-xs tracking-[0.16em] text-inverse-muted">
              NEXT CASE STUDY
            </span>
            <Link
              href={nextCaseStudy.href}
              className="mt-2 block font-display text-3xl leading-[0.95] font-black tracking-[-0.055em] whitespace-pre-line text-paper hover:text-inverse-muted layout:text-4xl"
            >
              <ResponsiveCopy long={nextCaseStudy.label} short={nextCaseStudy.labelShort} />
            </Link>
          </div>
          <Link
            href="#top"
            className="inline-flex min-h-11 min-w-11 items-center font-mono text-xs tracking-[0.16em] text-inverse-muted hover:text-paper"
          >
            <ResponsiveCopy long="BACK TO THE ISSUE ↑" short="BACK TO TOP ↑" />
          </Link>
        </SiteContainer>
      </footer>
    );
  }

  return (
    <footer className="bg-ink-dark text-paper">
      <SiteContainer className="grid gap-8 py-10 layout:grid-cols-[1.45fr_0.8fr_1.15fr_1fr] layout:gap-9 layout:py-14">
        <div>
          <Link
            href="/#top"
            className="inline-flex min-h-11 items-center font-display text-[2.375rem] font-black tracking-[-0.055em] text-paper hover:text-inverse-muted"
          >
            {homeContent.profile.wordmark}
          </Link>
          <p className="mt-4 max-w-xs text-[0.8125rem] leading-[1.7] text-inverse-muted layout:mt-6">
            {homeContent.footer.description}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p className="font-mono text-xs tracking-[0.2em] text-inverse-subtle">
            {homeContent.footer.siteLabel}
          </p>
          <div className="mt-3 flex flex-col gap-1 font-mono text-xs font-bold tracking-[0.12em] layout:mt-4">
            {homeContent.navigation
              .filter((item) => item.href !== "#archive")
              .map((item) => (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
                  className="flex min-h-11 min-w-11 w-fit items-center text-paper hover:text-inverse-muted"
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </nav>
        <div>
          <ResponsiveCopy
            as="p"
            long={homeContent.footer.socialLabel}
            short={homeContent.footer.socialLabelShort}
            className="font-mono text-xs tracking-[0.2em] text-inverse-subtle"
          />
          <div className="mt-3 flex flex-col gap-1 font-mono text-xs font-bold tracking-[0.12em] layout:mt-4">
            {homeContent.profile.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 min-w-11 w-fit items-center text-paper hover:text-inverse-muted"
              >
                <ResponsiveCopy long={item.label} short={item.labelShort} />
              </a>
            ))}
            <Link
              href="/#contact"
              className="flex min-h-11 min-w-11 w-fit items-center text-paper hover:text-inverse-muted"
            >
              RÉSUMÉ (PDF) ↓
            </Link>
          </div>
        </div>
        <div className="hidden layout:block">
          <p className="font-mono text-xs tracking-[0.2em] text-inverse-subtle">
            {homeContent.footer.directLabel}
          </p>
          <div className="mt-4 flex flex-col gap-1 font-mono text-xs font-bold tracking-[0.12em]">
            <a
              href={`mailto:${homeContent.profile.email}`}
              className="flex min-h-11 min-w-11 w-fit items-center break-all text-paper hover:text-inverse-muted"
            >
              {homeContent.profile.email.toUpperCase()}
            </a>
            <a
              href="tel:+18178197277"
              className="flex min-h-11 min-w-11 w-fit items-center text-paper hover:text-inverse-muted"
            >
              {homeContent.profile.phone}
            </a>
            <a
              href={homeContent.profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 min-w-11 w-fit items-center text-paper hover:text-inverse-muted"
            >
              DANYCB.COM
            </a>
          </div>
        </div>
      </SiteContainer>
      <SiteContainer className="flex flex-col gap-2 border-t border-inverse-subtle py-4 font-mono text-xs leading-[1.8] tracking-[0.16em] text-inverse-subtle layout:flex-row layout:items-center layout:justify-between layout:py-5 layout:text-xs">
        <span>{homeContent.footer.copyright}</span>
        <ResponsiveCopy long={homeContent.footer.notes} short={homeContent.footer.notesShort} />
        <Link href="#top" className="flex min-h-11 min-w-11 w-fit items-center text-inverse-subtle hover:text-paper">
          BACK TO TOP ↑
        </Link>
      </SiteContainer>
    </footer>
  );
}
