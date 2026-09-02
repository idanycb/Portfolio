import { ActionLink } from "@/shared/action-link";
import { SiteContainer } from "@/shared/site-container";
import { siteProfile } from "@/shared/site-profile";

const messagePrompts = ["Your name and email", "Role, collaboration, or another reason", "A short message"];

export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t-[1.5px] border-ink">
      <svg aria-hidden viewBox="0 0 300 230" className="ink-sketch pointer-events-none absolute bottom-[-1.8rem] left-8 hidden h-52 w-64 fill-none stroke-ink opacity-[0.14] lg:block" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M28 56 C28 48,34 44,44 44 L256 44 C266 44,272 48,272 58 L272 166 C272 176,266 180,256 180 L44 180 C34 180,28 176,28 166 Z" /><path d="M28 56 L150 132 L272 56 M118 118 L34 174 M182 118 L266 174" /></svg>
      <SiteContainer className="relative grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-[4.5rem]">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.1em] text-ink-muted uppercase">§5 / Contact</p>
          <h2 className="mt-4 font-display text-[clamp(3.5rem,7.4vw,5.75rem)] leading-[0.84] font-black tracking-[-0.062em] uppercase">Let&apos;s<br />build<br />something.</h2>
          <p className="mt-7 max-w-md text-base leading-7 font-semibold text-ink-soft">Open to backend, AI-platform, and full-stack roles in Dallas-Fort Worth or remote.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4"><ActionLink href={`mailto:${siteProfile.email}?subject=Resume%20request`} variant="outline">Request résumé ↓</ActionLink><ActionLink href={`mailto:${siteProfile.email}`} variant="text">{siteProfile.email}</ActionLink></div>
        </div>
        <div className="self-end pt-6">
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-muted uppercase">A direct message works best</p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">Email is the contact path on this site. Include these details and I can reply with useful context.</p>
          <div className="mt-6 space-y-6">{messagePrompts.map((prompt, index) => <div key={prompt}><span className="font-mono text-[0.625rem] tracking-[0.17em] text-ink-muted uppercase">0{index + 1} / {prompt}</span><div aria-hidden className="mt-5 h-px bg-ink" />{index === 2 ? <><div aria-hidden className="mt-7 h-px bg-rule" /><div aria-hidden className="mt-7 h-px bg-ink" /></> : null}</div>)}</div>
          <div className="mt-7 flex flex-wrap items-center gap-4"><ActionLink href={`mailto:${siteProfile.email}?subject=Portfolio%20inquiry`}>Email Daniel ↗</ActionLink><div className="flex items-center gap-2" aria-hidden="true"><svg viewBox="0 0 66 40" className="ink-sketch h-10 w-16 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M60 20 C44 8,26 10,8 22" /><path d="M18 14 C13 17,9 20,7 22 C11 25,15 28,19 32" /></svg><span className="font-annotation text-lg text-[#4a463f]">I read every message.</span></div></div>
        </div>
      </SiteContainer>
    </section>
  );
}
