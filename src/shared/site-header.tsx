import Link from "next/link";

import { homeContent } from "@/content/home";

import { MobileNav } from "./mobile-nav";
import { ResponsiveCopy } from "./responsive-copy";
import { SiteContainer } from "./site-container";

export type SiteHeaderProps = {
  variant?: "home" | "case-study";
  caseStudyLabel?: string;
  backLabel?: string;
  backLabelShort?: string;
  progressLabel?: string;
};

export function SiteHeader({
  variant,
  caseStudyLabel,
  backLabel = "← BACK TO THE ISSUE",
  backLabelShort = "← THE ISSUE",
  progressLabel = "§1 OF 8",
}: SiteHeaderProps) {
  const isCaseStudy = variant === "case-study" || Boolean(caseStudyLabel);

  return (
    <header className="sticky top-0 z-40 border-b-[1.5px] border-ink bg-paper md:relative">
      <a
        href="#main-content"
        className="absolute top-2 left-2 z-50 -translate-y-20 bg-ink px-4 py-3 font-mono text-xs font-bold text-paper transition-transform focus:translate-y-0"
      >
        SKIP TO CONTENT
      </a>
      <SiteContainer className="flex min-h-[68px] items-center justify-between gap-5 py-3.5 md:min-h-0 md:py-5">
        {isCaseStudy ? (
          <Link
            href="/"
            className="flex min-h-11 shrink-0 items-center font-mono text-[0.625rem] font-bold tracking-[0.15em] text-ink hover:text-link-hover"
          >
            <ResponsiveCopy long={backLabel} short={backLabelShort} />
          </Link>
        ) : (
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/#top"
              className="flex min-h-11 shrink-0 items-center font-display text-xl font-black tracking-[-0.05em] text-ink hover:text-link-hover md:text-[1.375rem]"
            >
              {homeContent.profile.wordmark}
            </Link>
            <ResponsiveCopy
              long={homeContent.profile.headerMeta}
              short={homeContent.profile.headerMetaShort}
              className="truncate font-mono text-[0.59375rem] tracking-[0.16em] text-muted"
            />
          </div>
        )}
        {isCaseStudy ? (
          <>
            <span className="truncate text-right font-mono text-[0.6rem] tracking-[0.14em] text-muted">
              {caseStudyLabel}
            </span>
            <span className="hidden font-mono text-[0.625rem] font-bold tracking-[0.15em] text-ink md:block">
              {progressLabel}
            </span>
          </>
        ) : (
          <>
            <MobileNav items={homeContent.navigation} />
            <nav
              aria-label="Primary navigation"
              className="hidden shrink-0 items-center justify-end gap-7 whitespace-nowrap font-mono text-[0.6875rem] font-bold tracking-[0.16em] md:flex"
            >
              {homeContent.navigation
                .filter((item) => item.href !== "#archive")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={`/${item.href}`}
                    className="flex min-h-11 items-center text-ink hover:text-link-hover"
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>
          </>
        )}
      </SiteContainer>
    </header>
  );
}
