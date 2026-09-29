import Image from "next/image";

import {
  HeroStartArrow,
  PortraitDoodles,
  PortraitFrameBack,
  PortraitFrameFront,
  PortraitNoteArrow,
  PortraitTape,
} from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ActionLink } from "@/shared/action-link";
import { SiteContainer } from "@/shared/site-container";

type HeroSectionProps = { content: HomepageContent["hero"] };

/* Portrait composition. `--pw` is the photo box's share of the figure width;
   the rest is a gutter for the tablet/desktop doodles. Below `tablet` there is
   no gutter: the photo spans the figure and the decorative overlay is hidden. */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="border-ink tablet:py-14 tablet:pb-16 layout:py-[72px] layout:pb-24 border-b-signature py-[34px] pb-11">
      <SiteContainer className="tablet:grid-cols-[minmax(0,1fr)_minmax(15rem,0.8fr)] tablet:gap-x-10 layout:grid-cols-[minmax(0,1.6fr)_minmax(19rem,1fr)] layout:gap-x-16 grid">
        <div className="tablet:col-span-2 layout:col-span-1 layout:col-start-1 layout:row-start-1 layout:self-end">
          <p className="animate-fi text-muted font-mono text-[0.59375rem] tracking-[0.24em]">
            {content.eyebrow}
          </p>
          <h1 className="text-home-hero animate-fu font-display text-ink mt-1.5 font-black">
            {content.title}
          </h1>
        </div>
        <figure className="tablet:col-start-2 tablet:row-start-2 tablet:mt-7 tablet:max-w-none tablet:self-start tablet:[--pw:72%] layout:row-span-2 layout:row-start-1 layout:mt-0 layout:self-end layout:pb-1 layout:[--pw:78%] tablet:mx-0 mx-auto mt-6 w-full max-w-[24rem] [--pw:100%]">
          <div className="layout:-rotate-1 relative -rotate-[1.5deg]">
            <div className="relative ml-auto aspect-[4/5] w-[var(--pw)]">
              <div className="bg-band absolute inset-x-0 top-[20%] bottom-0" />
              <PortraitFrameBack className="text-ink absolute inset-x-0 top-[20%] h-auto w-full" />
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                preload
                sizes={content.image.sizes}
                className="animate-[rise_900ms_cubic-bezier(.33,1,.68,1)_both] object-cover contrast-[1.06] grayscale sepia-[.08]"
              />
              <PortraitFrameFront className="text-ink absolute inset-x-0 top-[20%] h-auto w-full" />
              <PortraitTape className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/2 rotate-[24deg] animate-[fi_.5s_1.7s_both]" />
              <PortraitTape className="absolute top-[20%] right-0 translate-x-1/4 -translate-y-1/2 rotate-[28deg] animate-[fi_.5s_1.8s_both]" />
              <PortraitDoodles
                variant="mobile"
                className="ink-note tablet:hidden pointer-events-none absolute inset-0 block h-full w-full overflow-visible"
              />
              <PortraitDoodles className="ink-note tablet:block pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible" />
            </div>
          </div>
          <figcaption className="border-ink text-muted layout:text-[0.59375rem] mt-5 ml-auto flex w-[var(--pw)] flex-wrap justify-between gap-x-4 border-t pt-1.5 font-mono text-[0.5625rem] tracking-[0.14em]">
            <span>{content.captionLeft}</span>
            <span>{content.captionRight}</span>
          </figcaption>
          <div data-note="" className="ink-note layout:block relative mt-16 hidden">
            <PortraitNoteArrow className="absolute -top-[4.25rem] right-2" />
            <p className="font-hand [transform:rotate(-1.4deg)] text-[19px] leading-[1.35] whitespace-pre-line">
              {content.notes.portrait}
            </p>
          </div>
          <p
            data-note=""
            className="ink-note font-hand tablet:block layout:hidden mt-[18px] hidden [transform:rotate(-1deg)] text-lg leading-[1.3]"
          >
            {content.notes.portraitShort}
          </p>
        </figure>
        <div className="tablet:col-start-1 tablet:row-start-2 tablet:self-start">
          <h2 className="animate-fu font-display text-ink tablet:text-[clamp(1.6875rem,3.4vw,2rem)] layout:mt-10 layout:text-[clamp(1.875rem,3.4vw,2.75rem)] layout:leading-[1.08] layout:tracking-[-0.035em] mt-7 max-w-xl text-[1.6875rem] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance">
            {content.subtitle}
          </h2>
          <p className="animate-fu text-copy tablet:text-[1.1875rem] layout:mt-4 layout:text-[1.3125rem] mt-3.5 max-w-xl text-[1.0625rem] leading-[1.5]">
            {content.body}
          </p>
          <div className="border-rule layout:mt-8 mt-6 max-w-xl border-t pt-4">
            <p className="text-copy-muted layout:text-[0.9375rem] text-sm leading-[1.55]">
              {content.education}
            </p>
            <p className="text-ink layout:text-[0.78125rem] mt-2.5 font-mono text-[0.71875rem] leading-[1.9] font-bold tracking-[0.1em]">
              {content.skills.join(" · ")}
            </p>
          </div>
          <div className="tablet:flex-row tablet:flex-wrap tablet:gap-3 layout:mt-8 mt-6 flex flex-col gap-2.5">
            {content.actions.map((action) =>
              action.hrefMobile ? (
                <div key={action.label} className="contents">
                  <span className="layout:hidden tablet:w-auto w-full">
                    <ActionLink
                      href={action.hrefMobile}
                      variant="outline"
                      className="tablet:w-auto w-full"
                    >
                      {action.label}
                    </ActionLink>
                  </span>
                  <span className="layout:inline-flex hidden">
                    <ActionLink href={action.href} variant="outline">
                      {action.label}
                    </ActionLink>
                  </span>
                </div>
              ) : (
                <ActionLink
                  key={action.label}
                  href={action.href}
                  download={action.download}
                  variant={action.label.startsWith("VIEW") ? "solid" : "outline"}
                  className="tablet:w-auto w-full"
                >
                  {action.label}
                </ActionLink>
              ),
            )}
          </div>
          <div
            data-note=""
            className="ink-note tablet:flex layout:mt-4 mt-3.5 hidden items-start gap-2 pl-1"
          >
            <HeroStartArrow />
            <span className="font-hand layout:pt-6 layout:text-[19px] [transform:rotate(-2deg)] pt-4 text-lg leading-[1.25]">
              {content.notes.start}
            </span>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
