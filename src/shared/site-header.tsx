import Link from "next/link";

import { ContactNavCircle } from "@/components/svg/HomeDrawings";
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
    <header className="border-ink bg-paper sticky top-0 z-40 border-b-[1.5px] layout:relative">
      <a
        href="#main-content"
        className="bg-ink text-paper absolute top-2 left-2 z-50 -translate-y-20 px-4 py-3 font-mono text-xs font-bold transition-transform focus:translate-y-0"
      >
        SKIP TO CONTENT
      </a>
      <SiteContainer className="flex min-h-[68px] items-center justify-between gap-3 py-3.5 layout:min-h-0 layout:gap-5 layout:py-5">
        {isCaseStudy ? (
          <Link
            href="/"
            className="text-ink hover:text-link-hover flex min-h-11 shrink-0 items-center font-mono text-[0.65625rem] font-bold tracking-[0.14em] layout:text-[0.6875rem] layout:tracking-[0.16em]"
          >
            <ResponsiveCopy long={backLabel} short={backLabelShort} />
          </Link>
        ) : (
          <div className="flex min-w-0 flex-col items-start gap-0.5 layout:flex-row layout:items-baseline layout:gap-[18px]">
            <Link
              href="/#top"
              className="font-display text-ink hover:text-link-hover block shrink-0 py-1 text-xl leading-[1.1] font-black tracking-[-0.045em] layout:py-0 layout:text-[1.375rem]"
            >
              {homeContent.profile.wordmark}
            </Link>
            <ResponsiveCopy
              long={homeContent.profile.headerMeta}
              short={homeContent.profile.headerMetaShort}
              className="text-muted font-mono text-[0.53125rem] leading-[1.1] tracking-[0.16em] layout:text-[0.625rem] layout:tracking-[0.18em] layout:whitespace-nowrap"
            />
          </div>
        )}
        {isCaseStudy ? (
          <>
            <span className="text-muted min-w-0 text-right font-mono text-[0.5625rem] tracking-[0.18em] whitespace-nowrap layout:text-[0.625rem] layout:tracking-[0.2em]">
              {caseStudyLabel}
            </span>
            <span className="text-muted hidden font-mono text-[0.625rem] tracking-[0.16em] layout:block">
              {progressLabel}
            </span>
          </>
        ) : (
          <>
            <MobileNav items={homeContent.navigation} />
            <nav
              aria-label="Primary navigation"
              className="hidden shrink-0 items-center justify-end gap-[30px] font-mono text-[0.6875rem] leading-[1.2] font-bold tracking-[0.16em] whitespace-nowrap layout:flex"
            >
              {homeContent.navigation
                .filter((item) => item.href !== "#archive")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={`/${item.href}`}
                    className={`text-ink hover:text-link-hover relative ${
                      item.href === "#contact" ? "px-2.5 py-1.5" : ""
                    }`}
                  >
                    {item.label}
                    {item.href === "#contact" ? (
                      <ContactNavCircle className="pointer-events-none absolute -top-2 -left-4 overflow-visible" />
                    ) : null}
                  </Link>
                ))}
            </nav>
          </>
        )}
      </SiteContainer>
    </header>
  );
}
