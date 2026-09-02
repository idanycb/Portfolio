import { SiteContainer } from "@/shared/site-container";

import { experienceItems } from "./data";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-16 border-y-[1.5px] border-ink bg-[#efece5]">
      <SiteContainer className="py-16">
        <header>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-baseline gap-4"><span className="font-mono text-xs font-bold tracking-[0.1em] text-ink-muted">§2</span><h2 className="font-display text-4xl leading-[0.9] font-black tracking-[-0.05em] uppercase sm:text-5xl">Experience &amp; education</h2></div>
            <p className="pb-1 font-mono text-[0.625rem] tracking-[0.16em] text-ink-muted uppercase">2020-2026</p>
          </div>
          <InkRule />
        </header>
        <div className="relative mt-10 sm:mt-12">
          {experienceItems.map((item, index) => (
            <article key={item.title} className={`relative grid gap-5 pb-12 last:pb-0 md:grid-cols-[9.5rem_8.25rem_1fr] md:gap-0 ${index < experienceItems.length - 1 ? "md:pb-14" : ""}`}>
              {index < experienceItems.length - 1 ? <span aria-hidden className="absolute top-28 bottom-1 left-[13.55rem] hidden border-l-2 border-dashed border-[#b0aaa0] md:block" /> : null}
              <div className="md:pt-5 md:pr-7 md:text-right">
                <p className="font-mono text-xs font-bold tracking-[0.12em] uppercase">{item.dates}</p>
                <p className="mt-1 font-mono text-[0.625rem] tracking-[0.12em] text-ink-muted uppercase">{item.meta}</p>
                {index === 0 ? <p className="mt-3 hidden font-annotation text-base leading-5 text-[#4a463f] md:block">My first real<br />code review.</p> : null}
              </div>
              <div className="hidden justify-center pt-2 md:flex"><ExperienceMark index={index} /></div>
              <div className="md:pt-3 md:pl-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2"><h3 className={`font-display leading-[1.05] font-black tracking-[-0.045em] ${index === 0 ? "text-4xl" : "max-w-2xl text-3xl"}`}>{item.title}</h3>{index === 0 ? <p className="font-mono text-xs font-bold tracking-[0.12em] text-[#4a463f] uppercase">{item.subtitle}</p> : null}</div>
                {index > 0 ? <p className="mt-3 font-mono text-xs font-bold tracking-[0.12em] text-[#4a463f] uppercase">{item.subtitle}</p> : null}
                {"detail" in item ? <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-ink-soft">{item.detail}</p> : null}
                {"stack" in item ? <p className="mt-3 font-mono text-[0.625rem] leading-6 tracking-[0.12em] text-ink-muted uppercase">{item.stack}</p> : null}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-11 grid gap-3 border-t border-rule pt-4 md:grid-cols-[15rem_1fr] md:gap-7">
          <span className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-muted uppercase md:text-right">Certifications</span>
          <span className="font-mono text-[0.68rem] leading-6 tracking-[0.09em] text-[#4a463f] uppercase">Architecting with Google Compute Engine / The Bits and Bytes of Computer Networking / Foundations of Project Management / Advance Your Skills in JavaScript</span>
        </div>
      </SiteContainer>
    </section>
  );
}

function InkRule() { return <svg aria-hidden viewBox="0 0 1144 18" preserveAspectRatio="none" className="ink-sketch mt-4 h-[18px] w-full fill-none stroke-ink" strokeWidth="2.8" strokeLinecap="round"><path d="M3 10 C220 4, 520 15, 780 9 C940 5, 1050 8, 1141 11" /></svg>; }

function ExperienceMark({ index }: { index: number }) {
  return <svg aria-hidden viewBox="0 0 118 100" className="ink-sketch h-24 w-[118px] fill-none stroke-ink" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{index === 0 ? <><path d="M12 14 C12 10,15 8,20 8 L92 8 C97 8,100 10,100 15 L100 68 C100 73,97 75,92 75 L20 75 C15 75,12 73,12 68 Z" strokeWidth="1.8" /><path d="M12 24 L100 24" /><circle cx="22" cy="16" r="2.6" /><circle cx="32" cy="16" r="2.6" /><circle cx="42" cy="16" r="2.6" /><path d="M26 40 L62 40 M26 52 L84 52 M26 63 L52 63 M46 78 L46 86 M30 88 L82 88" /></> : index === 1 ? <><path d="M59 10 L108 30 L59 50 L10 30 Z" strokeWidth="1.8" /><path d="M28 38 L28 62 C28 72,90 72,90 62 L90 38 M104 32 L104 66 M104 66 C99 70,99 78,104 82 C109 78,109 70,104 66 Z M18 84 L100 84" /></> : <><path d="M59 12 L102 34 L16 34 Z" strokeWidth="1.8" /><path d="M12 40 L106 40 M28 44 L28 74 M50 44 L50 74 M68 44 L68 74 M90 44 L90 74 M12 80 L106 80 M6 88 L112 88" /></>}</svg>;
}
