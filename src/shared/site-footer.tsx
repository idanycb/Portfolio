import Link from "next/link";

import { homeContent } from "@/content/home";

import { HashLink } from "./hash-link";
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
        <SiteContainer className="tablet:flex-row tablet:items-end tablet:justify-between layout:py-[2.125rem] flex flex-col gap-8 py-8">
          <div>
            <span className="text-inverse-muted layout:text-[0.625rem] font-mono text-[0.5625rem] tracking-[0.16em]">
              NEXT CASE STUDY
            </span>
            <Link
              href={nextCaseStudy.href}
              className="font-display text-paper hover:text-inverse-muted mt-2 block text-3xl leading-[0.95] font-black tracking-[-0.05em] whitespace-pre-line"
            >
              <ResponsiveCopy long={nextCaseStudy.label} short={nextCaseStudy.labelShort} />
            </Link>
          </div>
          <HashLink
            href="#top"
            className="text-inverse-muted layout:text-[0.59375rem] hover:text-paper inline-flex min-h-11 min-w-11 items-center font-mono text-[0.5625rem] tracking-[0.16em]"
          >
            <ResponsiveCopy long="BACK TO THE ISSUE ↑" short="BACK TO TOP ↑" />
          </HashLink>
        </SiteContainer>
      </footer>
    );
  }

  return (
    <footer className="bg-ink-dark text-paper">
      <SiteContainer className="tablet:grid-cols-2 tablet:gap-x-10 tablet:gap-y-8 tablet:py-12 layout:grid-cols-[1.45fr_0.8fr_1.15fr_1fr] layout:gap-9 layout:py-14 grid grid-cols-2 gap-x-5 gap-y-7 py-8">
        <div className="tablet:col-span-1 col-span-2">
          <HashLink
            href="/#top"
            className="font-display text-paper layout:text-[2.75rem] hover:text-inverse-muted inline-flex min-h-11 items-center text-[2.375rem] font-black tracking-[-0.055em]"
          >
            {homeContent.profile.wordmark}
          </HashLink>
          <p className="text-inverse-muted layout:mt-6 mt-4 max-w-xs text-[0.8125rem] leading-[1.7]">
            {homeContent.footer.description}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p className="text-inverse-subtle layout:text-[0.625rem] font-mono text-[0.5625rem] tracking-[0.2em]">
            {homeContent.footer.siteLabel}
          </p>
          <div className="tablet:mt-3 layout:mt-4 layout:text-[0.71875rem] tablet:gap-1 mt-2 flex flex-col font-mono text-[0.6875rem] font-bold tracking-[0.12em]">
            {homeContent.navigation
              .filter((item) => item.href !== "#archive")
              .map((item) => (
                <HashLink
                  key={item.href}
                  href={`/${item.href}`}
                  className="text-paper hover:text-inverse-muted flex min-h-11 w-fit min-w-11 items-center"
                >
                  {item.label}
                </HashLink>
              ))}
          </div>
        </nav>
        <div>
          <ResponsiveCopy
            as="p"
            long={homeContent.footer.socialLabel}
            short={homeContent.footer.socialLabelShort}
            at="tablet"
            className="text-inverse-subtle layout:text-[0.625rem] font-mono text-[0.5625rem] tracking-[0.2em]"
          />
          <div className="tablet:mt-3 layout:mt-4 layout:text-[0.71875rem] tablet:gap-1 mt-2 flex flex-col font-mono text-[0.6875rem] font-bold tracking-[0.12em]">
            {homeContent.profile.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper hover:text-inverse-muted flex min-h-11 w-fit min-w-11 items-center"
              >
                <ResponsiveCopy long={item.label} short={item.labelShort} />
              </a>
            ))}
            <HashLink
              href="/#contact"
              className="text-paper hover:text-inverse-muted flex min-h-11 w-fit min-w-11 items-center"
            >
              RÉSUMÉ (PDF) ↓
            </HashLink>
          </div>
        </div>
        <div className="tablet:block hidden">
          <p className="text-inverse-subtle layout:text-[0.625rem] font-mono text-[0.5625rem] tracking-[0.2em]">
            {homeContent.footer.directLabel}
          </p>
          <div className="layout:text-[0.71875rem] mt-4 flex flex-col gap-1 font-mono text-[0.6875rem] font-bold tracking-[0.12em]">
            <a
              href={`mailto:${homeContent.profile.email}`}
              className="text-paper hover:text-inverse-muted flex min-h-11 w-fit min-w-11 items-center break-all"
            >
              {homeContent.profile.email.toUpperCase()}
            </a>
            <a
              href={homeContent.profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper hover:text-inverse-muted flex min-h-11 w-fit min-w-11 items-center"
            >
              DANYCB.COM
            </a>
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}
