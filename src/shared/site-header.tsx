import Link from "next/link";

import { ContactNavCircle } from "@/components/svg/HomeDrawings";
import { homeContent } from "@/content/home";

import { AutoHideHeader } from "./auto-hide-header";
import { HashLink } from "./hash-link";
import { MobileNav } from "./mobile-nav";
import { ResponsiveCopy } from "./responsive-copy";
import { SiteContainer } from "./site-container";

export type SiteHeaderProps = {
  variant?: "home" | "case-study";
  caseStudyLabel?: string;
  caseStudyLabelShort?: string;
  backLabel?: string;
  backLabelShort?: string;
  progressLabel?: string;
};

export function SiteHeader({
  variant,
  caseStudyLabel,
  caseStudyLabelShort,
  backLabel = "← BACK TO THE ISSUE",
  backLabelShort = "← THE ISSUE",
  progressLabel = "§1 OF 8",
}: SiteHeaderProps) {
  const isCaseStudy = variant === "case-study" || Boolean(caseStudyLabel);

  const content = (
    <>
      <HashLink
        href="#main-content"
        className="bg-ink text-paper absolute top-2 left-2 z-50 -translate-y-20 px-4 py-3 font-mono text-xs font-bold transition-transform focus:translate-y-0"
      >
        SKIP TO CONTENT
      </HashLink>
      <SiteContainer className="layout:min-h-0 layout:gap-5 layout:py-5 flex min-h-[68px] items-center justify-between gap-3 py-3.5">
        {isCaseStudy ? (
          <Link
            href="/"
            className="text-ink hover:text-link-hover layout:text-[0.6875rem] layout:tracking-[0.16em] flex min-h-11 shrink-0 items-center font-mono text-[0.65625rem] font-bold tracking-[0.14em]"
          >
            <ResponsiveCopy long={backLabel} short={backLabelShort} />
          </Link>
        ) : (
          <div className="layout:flex-row layout:items-center layout:gap-[18px] flex min-w-0 flex-col items-start gap-0.5">
            <HashLink
              href="/#top"
              className="font-display text-ink hover:text-link-hover layout:py-0 layout:text-[1.375rem] block shrink-0 py-1 text-xl leading-[1.1] font-black tracking-[-0.045em]"
            >
              {homeContent.profile.wordmark}
            </HashLink>
            <ResponsiveCopy
              long={homeContent.profile.headerMeta}
              short={homeContent.profile.headerMetaShort}
              className="text-muted layout:text-[0.625rem] layout:tracking-[0.18em] layout:whitespace-nowrap font-mono text-[0.5625rem] leading-[1.1] tracking-[0.16em]"
            />
          </div>
        )}
        {isCaseStudy ? (
          <>
            <ResponsiveCopy
              long={caseStudyLabel}
              short={caseStudyLabelShort}
              className="text-muted layout:text-[0.625rem] layout:tracking-[0.2em] min-w-0 text-right font-mono text-[0.5625rem] tracking-[0.18em] whitespace-nowrap"
            />
            <span className="text-muted layout:block hidden font-mono text-[0.625rem] tracking-[0.16em]">
              {progressLabel}
            </span>
          </>
        ) : (
          <>
            <MobileNav items={homeContent.navigation} />
            <nav
              aria-label="Primary navigation"
              className="layout:flex hidden shrink-0 items-center justify-end gap-[30px] font-mono text-[0.6875rem] leading-[1.2] font-bold tracking-[0.16em] whitespace-nowrap"
            >
              {homeContent.navigation
                .filter((item) => item.href !== "#archive")
                .map((item) => (
                  <HashLink
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
                  </HashLink>
                ))}
            </nav>
          </>
        )}
      </SiteContainer>
    </>
  );

  // Case studies are long reads: the header stays reachable at every width but
  // slides out of the way while scrolling down. The homepage header stays put.
  return isCaseStudy ? (
    <AutoHideHeader className="border-ink bg-paper border-b-signature sticky top-0 z-40">
      {content}
    </AutoHideHeader>
  ) : (
    <header className="border-ink bg-paper layout:relative border-b-signature sticky top-0 z-40">
      {content}
    </header>
  );
}
