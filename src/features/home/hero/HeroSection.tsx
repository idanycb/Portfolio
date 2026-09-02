import Image from "next/image";

import portrait from "@/assets/images/hero/portrait-grayscale.png";
import { ActionLink } from "@/shared/action-link";
import { SiteContainer } from "@/shared/site-container";
import { siteProfile } from "@/shared/site-profile";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <SiteContainer className="grid h-full grid-cols-6">
          {Array.from({ length: 5 }).map((_, index) => <span key={index} className="border-r border-dashed border-rule/70" />)}
        </SiteContainer>
      </div>
      <SiteContainer className="relative grid gap-12 py-14 md:py-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(19rem,1fr)] lg:items-start lg:gap-16 lg:py-[4.75rem]">
        <div className="relative z-10">
          <p className="editorial-fade font-mono text-[0.625rem] tracking-[0.24em] text-ink-muted uppercase">Hey, I&apos;m</p>
          <h1 className="editorial-rise mt-2 font-display text-[clamp(5.5rem,14.5vw,13rem)] leading-[0.78] font-black tracking-[-0.068em] text-ink">DANY.</h1>
          <h2 className="editorial-rise mt-14 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.04em]">{siteProfile.role}</h2>
          <p className="editorial-rise mt-4 max-w-[37rem] text-lg leading-8 text-ink-soft sm:text-[1.3rem]">I build reliable Java and Spring systems, RAG pipelines, and cloud-native applications.</p>
          <div className="editorial-rise mt-8 max-w-[37rem] border-t border-rule pt-5">
            <p className="text-[0.92rem] leading-6 text-[#4a463f]">MS Computer Science at UT Arlington. Experienced across</p>
            <p className="mt-2 font-mono text-[0.68rem] leading-6 font-bold tracking-[0.1em] uppercase sm:text-xs">Java / Spring Boot / RAG / PostgreSQL / AWS / Next.js / Kubernetes</p>
          </div>
          <div className="editorial-rise mt-9 flex flex-wrap items-center gap-3">
            <ActionLink href="#work" className="px-6 py-4">View projects ↗</ActionLink>
            <ActionLink variant="outline" href={`mailto:${siteProfile.email}?subject=Resume%20request`} className="px-6 py-[0.95rem]">Request résumé ↓</ActionLink>
            <ActionLink variant="outline" href="#contact" className="px-6 py-[0.95rem]">Contact me</ActionLink>
          </div>
          <div className="mt-3 flex items-start gap-1 pl-1" aria-hidden="true">
            <svg viewBox="0 0 64 58" className="ink-sketch h-14 w-16 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M40 52 C30 40, 24 26, 22 8" /><path d="M12 20 C15 15, 19 10, 22 6 C25 11, 28 16, 32 21" /></svg>
            <p className="pt-6 font-annotation text-lg leading-6 -rotate-2">Start here</p>
          </div>
        </div>

        <figure className="editorial-fade relative mx-auto w-full max-w-[25rem] lg:justify-self-end">
          <div className="relative h-[28rem] border-[1.6px] border-ink bg-[radial-gradient(circle_at_4px_4px,#96918a_1.6px,transparent_1.7px)] bg-[size:9px_9px] sm:h-[32.5rem]">
            <Image src={portrait} alt="Portrait of Daniel Thomas Jesudoss" priority sizes="(min-width: 1024px) 400px, 90vw" className="h-full w-full object-cover grayscale contrast-110" />
            <span aria-hidden className="absolute -top-[0.45rem] -left-[0.45rem] size-[0.9rem] rounded-full border-[1.6px] border-ink bg-paper" />
            <span aria-hidden className="absolute -right-[0.45rem] -bottom-[0.45rem] size-[0.9rem] rounded-full border-[1.6px] border-ink bg-paper" />
          </div>
          <figcaption className="mt-2 flex justify-between border-t border-ink pt-2 font-mono text-[0.56rem] tracking-[0.14em] text-ink-muted uppercase"><span>Dany C.B.</span><span>{siteProfile.location}</span></figcaption>
          <div className="relative mt-11 pl-1" aria-hidden="true">
            <svg viewBox="0 0 118 72" className="ink-sketch absolute -top-14 -left-3 h-[72px] w-[118px] fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M100 8 C88 30, 62 46, 30 54" /><path d="M42 42 C36 49, 32 53, 28 55 C33 58, 38 61, 43 65" /></svg>
            <p className="font-annotation text-lg leading-6 -rotate-1">I draw the system<br />before I build it.<br />Every diagram here<br />is mine.</p>
          </div>
        </figure>
      </SiteContainer>
    </section>
  );
}
