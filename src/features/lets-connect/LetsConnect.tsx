import { FadeIn, Marquee } from "@/components/animation";
import { letsConnectData } from "./data/letsConnectData";

export function LetsConnect() {
  const { socials, ticker } = letsConnectData;

  return (
    <section
      id="contact"
      className="font-archivo w-screen border-t-[3px] border-black"
      aria-labelledby="contact-heading"
    >
      {/* Section Header */}
      <header className="flex items-baseline justify-between border-b-[3px] border-black px-4 py-5 lg:px-18">
        <span className="text-[9px] font-bold tracking-[0.15em] text-[#717171] uppercase lg:text-[11px]">
          CONTACT
        </span>
        <span className="text-[9px] font-bold tracking-widest text-[#717171] lg:text-[11px]">
          Find me online
        </span>
      </header>

      {/* Hero Row */}
      <FadeIn
        scrollTrigger
        className="flex items-center justify-between px-4 pt-6 lg:items-end lg:px-18 lg:pt-13"
      >
        <h2
          id="contact-heading"
          className="text-[clamp(56px,10vw,148px)] leading-[0.88] font-black tracking-[-0.07em] uppercase"
        >
          LET&apos;S
          <br />
          CON
          <br className="sm:hidden" />
          NECT.
        </h2>

        <div className="mt-4 flex flex-col items-end gap-5 pb-2 lg:mt-0">
          <p className="max-w-40 text-right text-[10px] leading-[1.3] font-bold text-[#4a4848] lg:text-[11px]">
            I&apos;m always open to new opportunities, collabs, and conversations.
          </p>
          <div className="hidden items-center gap-2.5 text-[11px] font-bold tracking-[0.08em] text-[#a3a3a3] uppercase lg:flex">
            <div className="h-0.5 w-10 bg-[#a3a3a3]" aria-hidden="true" />
            Scroll to explore
          </div>
        </div>
      </FadeIn>

      {/* Social Cards */}
      <ul className="mt-6 border-t-[3px] border-black lg:mt-14 lg:grid lg:grid-cols-3">
        {socials.map((social, i) => (
          <FadeIn
            as="li"
            from="left"
            scrollTrigger
            key={social.num}
            className={`border-b-[3px] border-black ${i < socials.length - 1 ? "lg:border-r-[3px] lg:border-black" : ""}`}
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/card block h-full text-black no-underline transition-colors duration-200 hover:bg-black hover:text-white lg:hover:bg-black"
            >
              {/* Desktop: Black platform bar */}
              <div className="hidden items-center justify-between border-b-[3px] border-black bg-black px-8 py-2.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-colors duration-200 group-hover/card:bg-white group-hover/card:text-black lg:flex">
                <span>{social.bar}</span>
                <span aria-hidden="true">↗</span>
              </div>

              {/* Desktop: Card inner */}
              <div className="hidden min-h-85 flex-col px-8 pt-9 pb-10 lg:flex">
                <span className="mb-5 text-[11px] font-bold tracking-widest text-[#a3a3a3]">
                  {social.num}
                </span>
                <h3 className="mb-5 text-[64px] leading-[0.88] font-black tracking-[-0.06em] uppercase">
                  {social.platformName[0]}
                  <br />
                  {social.platformName[1]}
                </h3>
                <p className="mb-4 text-base font-bold tracking-[-0.03em] text-[#4a4848] group-hover/card:text-[#a3a3a3]">
                  {social.handle}
                </p>
                <p className="flex-1 text-[11px] leading-[1.4] font-bold text-[#a3a3a3]">
                  {social.tagline.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <div className="mt-8 flex items-center justify-between border-t-2 border-black pt-5 transition-colors duration-200 group-hover/card:border-[#666]">
                  <span className="text-[11px] font-bold tracking-[0.04em] break-all lowercase opacity-20 group-hover/card:opacity-30">
                    {social.url}
                  </span>
                  <span
                    className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-current bg-transparent text-xl transition-colors duration-200 group-hover/card:bg-white group-hover/card:text-black"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </div>

              {/* Mobile: Compact row */}
              <div className="flex min-h-18 items-center gap-3 px-4 lg:hidden">
                <span className="w-5 shrink-0 text-[9px] font-bold tracking-widest text-[#a3a3a3] group-hover/card:text-[#a3a3a3]">
                  {social.num}
                </span>
                <div className="flex flex-1 flex-col gap-0.75 py-4">
                  <span className="text-[22px] leading-none font-black tracking-[-0.05em] uppercase">
                    {social.platformName[0]}
                    {social.platformName[1]}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.02em] text-[#a3a3a3] group-hover/card:text-[#a3a3a3]">
                    {social.handle}
                  </span>
                </div>
                <span className="shrink-0 border-2 border-current px-2.5 py-0.75 text-[8px] font-bold tracking-[0.08em] uppercase">
                  {social.pillLabel}
                </span>
                <span
                  className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full border-2 border-current bg-transparent text-sm transition-colors duration-200 group-hover/card:bg-white group-hover/card:text-black"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </a>
          </FadeIn>
        ))}
      </ul>

      {/* Ticker Band */}
      <Marquee tags={[ticker]} />
    </section>
  );
}
