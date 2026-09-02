import Link from "next/link";

import { siteProfile } from "./site-profile";
import { SiteContainer } from "./site-container";

type SiteHeaderProps = {
  caseStudyLabel?: string;
};

export function SiteHeader({ caseStudyLabel }: SiteHeaderProps) {
  const isCaseStudy = Boolean(caseStudyLabel);

  return (
    <header className="relative z-20 border-b-[1.5px] border-ink bg-paper">
      <SiteContainer className="relative flex min-h-16 items-center justify-between gap-5 py-4">
        <span aria-hidden className="absolute -top-2 left-3 h-px w-5 bg-ink sm:left-5" />
        <span aria-hidden className="absolute -top-2 left-3 h-5 w-px bg-ink sm:left-5" />
        <span aria-hidden className="absolute -top-2 right-3 hidden h-px w-5 bg-ink sm:block sm:right-5" />
        <span aria-hidden className="absolute -top-2 right-3 hidden h-5 w-px bg-ink sm:block sm:right-5" />
        {isCaseStudy ? (
          <Link href="/" className="shrink-0 font-mono text-[0.625rem] font-bold tracking-[0.15em] text-ink uppercase hover:text-ink-muted">← Back to the issue</Link>
        ) : (
          <div className="flex min-w-0 items-baseline gap-4">
            <Link href="/#top" className="shrink-0 font-display text-[1.35rem] font-black tracking-[-0.05em] text-ink hover:text-ink-muted">{siteProfile.wordmark}</Link>
            <span className="hidden truncate font-mono text-[0.58rem] tracking-[0.16em] text-ink-muted uppercase xl:block">{siteProfile.name} / {siteProfile.location}</span>
          </div>
        )}
        {isCaseStudy ? (
          <span className="truncate text-right font-mono text-[0.6rem] tracking-[0.14em] text-ink-muted uppercase">{caseStudyLabel}</span>
        ) : (
          <nav aria-label="Primary navigation" className="flex shrink-0 items-center justify-end gap-3 font-mono text-[0.58rem] font-bold tracking-[0.12em] whitespace-nowrap uppercase sm:gap-5 sm:text-[0.625rem] lg:gap-7">
            {siteProfile.navigation.map((item) => (
              <Link key={item.href} href={item.href} className={`relative text-ink hover:text-ink-muted ${item.label === "Experience" ? "hidden sm:inline-flex" : ""} ${item.label === "Contact" ? "px-2 py-1" : ""}`}>
                {item.label}{item.label === "Contact" ? <svg aria-hidden viewBox="0 0 106 40" className="ink-sketch pointer-events-none absolute -top-2 -left-4 h-10 w-[106px] overflow-visible fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round"><path d="M30 5 C68 2, 98 10, 99 20 C100 31, 60 36, 30 34 C10 32, 4 23, 8 15 C12 8, 26 5, 40 5" /></svg> : null}
              </Link>
            ))}
          </nav>
        )}
      </SiteContainer>
    </header>
  );
}
