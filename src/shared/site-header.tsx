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
    <header className="border-ink bg-paper sticky top-0 z-40 border-b-[1.5px] md:relative">
      <a
        href="#main-content"
        className="bg-ink text-paper absolute top-2 left-2 z-50 -translate-y-20 px-4 py-3 font-mono text-xs font-bold transition-transform focus:translate-y-0"
      >
        SKIP TO CONTENT
      </a>
      <SiteContainer className="flex min-h-[68px] items-center justify-between gap-5 py-3.5 md:min-h-0 md:py-5">
        {isCaseStudy ? (
          <Link
            href="/"
            className="text-ink hover:text-link-hover flex min-h-11 shrink-0 items-center font-mono text-[0.625rem] font-bold tracking-[0.15em]"
          >
            <ResponsiveCopy long={backLabel} short={backLabelShort} />
          </Link>
        ) : (
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/#top"
              className="font-display text-ink hover:text-link-hover flex min-h-11 shrink-0 items-center text-xl font-black tracking-[-0.05em] md:text-[1.375rem]"
            >
              {homeContent.profile.wordmark}
            </Link>
            <ResponsiveCopy
              long={homeContent.profile.headerMeta}
              short={homeContent.profile.headerMetaShort}
              className="text-muted truncate font-mono text-[0.59375rem] tracking-[0.16em]"
            />
          </div>
        )}
        {isCaseStudy ? (
          <>
            <span className="text-muted truncate text-right font-mono text-[0.6rem] tracking-[0.14em]">
              {caseStudyLabel}
            </span>
            <span className="text-ink hidden font-mono text-[0.625rem] font-bold tracking-[0.15em] md:block">
              {progressLabel}
            </span>
          </>
        ) : (
          <>
            <MobileNav items={homeContent.navigation} />
            <nav
              aria-label="Primary navigation"
              className="hidden shrink-0 items-center justify-end gap-7 font-mono text-[0.6875rem] font-bold tracking-[0.16em] whitespace-nowrap md:flex"
            >
              {homeContent.navigation
                .filter((item) => item.href !== "#archive")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={`/${item.href}`}
                    className="text-ink hover:text-link-hover relative flex min-h-11 items-center"
                  >
                    {item.label}
                    {item.href === "#contact" ? (
                      <ContactNavCircle className="pointer-events-none absolute -top-0.5 -left-4 overflow-visible" />
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
