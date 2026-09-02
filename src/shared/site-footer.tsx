import Link from "next/link";

import { siteProfile } from "./site-profile";
import { SiteContainer } from "./site-container";

type SiteFooterProps = {
  nextCaseStudy?: {
    href: string;
    label: string;
  };
};

export function SiteFooter({ nextCaseStudy }: SiteFooterProps) {
  if (nextCaseStudy) {
    return <footer className="bg-inverse text-paper"><SiteContainer className="flex flex-col gap-5 py-8 sm:flex-row sm:items-end sm:justify-between"><div><span className="font-mono text-[0.625rem] tracking-[0.16em] text-inverse-muted uppercase">Next case study</span><Link href={nextCaseStudy.href} className="mt-2 block font-display text-3xl font-black tracking-[-0.055em] text-paper hover:text-inverse-muted sm:text-4xl">{nextCaseStudy.label} →</Link></div><Link href="/" className="font-mono text-[0.625rem] tracking-[0.16em] text-inverse-muted uppercase hover:text-paper">Back to the issue ↑</Link></SiteContainer></footer>;
  }

  return (
    <footer className="bg-inverse text-paper">
      <SiteContainer className="grid gap-9 py-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.8fr_1.15fr_1fr] lg:py-14">
        <div>
          <Link href="/#top" className="relative inline-block font-display text-3xl font-black tracking-[-0.055em] text-paper hover:text-inverse-muted">
            {siteProfile.wordmark}<svg aria-hidden viewBox="0 0 150 18" className="absolute -bottom-2 left-0 h-5 w-36 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round"><path d="M4 9 C40 3, 108 4, 146 10" /></svg>
          </Link>
          <p className="mt-5 max-w-xs text-[0.82rem] leading-6 text-inverse-muted">{siteProfile.name}, {siteProfile.role.toLowerCase()}.</p>
        </div>
        <nav aria-label="Footer navigation">
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-[#6f6a63] uppercase">Site</p>
          <div className="mt-4 flex flex-col gap-3 font-mono text-[0.6875rem] font-bold tracking-[0.12em] uppercase">{siteProfile.navigation.map((item) => <Link key={item.href} href={item.href} className="w-fit text-paper hover:text-inverse-muted">{item.label}</Link>)}</div>
        </nav>
        <div>
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-[#6f6a63] uppercase">Professional</p>
          <div className="mt-4 flex flex-col gap-3 font-mono text-[0.6875rem] font-bold tracking-[0.12em] uppercase">{siteProfile.social.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="w-fit text-paper hover:text-inverse-muted">{item.label} ↗</a>)}<a href={`mailto:${siteProfile.email}?subject=Resume%20request`} className="w-fit text-paper hover:text-inverse-muted">Résumé request ↓</a></div>
        </div>
        <div>
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-[#6f6a63] uppercase">Direct</p>
          <div className="mt-4 flex flex-col gap-3 font-mono text-[0.6875rem] font-bold tracking-[0.12em] uppercase"><a href={`mailto:${siteProfile.email}`} className="w-fit break-all text-paper hover:text-inverse-muted">{siteProfile.email}</a><a href={siteProfile.url} className="w-fit text-paper hover:text-inverse-muted">danycb.com</a></div>
        </div>
      </SiteContainer>
      <SiteContainer className="flex flex-col gap-3 border-t border-white/15 py-5 font-mono text-[0.625rem] tracking-[0.12em] text-inverse-muted uppercase sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {siteProfile.name}</span>
        <Link href="/#top" className="w-fit hover:text-paper">
          Back to top ↑
        </Link>
      </SiteContainer>
    </footer>
  );
}
