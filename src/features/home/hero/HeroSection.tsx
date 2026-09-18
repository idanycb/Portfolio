import Image from "next/image";

import { HeroStartArrow, PortraitNoteArrow } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ActionLink } from "@/shared/action-link";
import { SiteContainer } from "@/shared/site-container";

type HeroSectionProps = { content: HomepageContent["hero"] };

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="border-ink border-b-[1.6px] py-[34px] pb-11 layout:py-[72px] layout:pb-24">
      <SiteContainer className="grid gap-8 layout:grid-cols-[minmax(0,1.6fr)_minmax(19rem,1fr)] layout:items-end layout:gap-16">
        <div>
          <p className="animate-fi text-muted font-mono text-xs tracking-[0.24em]">
            {content.eyebrow}
          </p>
          <h1 className="text-home-hero animate-fu font-display text-ink mt-1.5 font-black">
            {content.title}
          </h1>
          <h2 className="animate-fu font-display text-ink mt-7 max-w-xl text-balance text-[1.6875rem] leading-[1.1] font-extrabold tracking-[-0.03em] layout:mt-10 layout:text-[clamp(1.875rem,3vw,2.75rem)]">
            {content.subtitle}
          </h2>
          <p className="animate-fu text-copy mt-3.5 max-w-xl text-[1.0625rem] leading-[1.5] layout:mt-4 layout:text-[1.3125rem]">
            {content.body}
          </p>
          <div className="border-rule mt-6 max-w-xl border-t pt-4 layout:mt-8">
            <p className="text-copy-muted text-sm leading-[1.55] layout:text-[0.9375rem]">
              {content.education}
            </p>
            <p className="text-ink mt-2.5 font-mono text-xs leading-[1.9] font-bold tracking-[0.1em] layout:text-xs">
              {content.skills.join(" · ")}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2.5 layout:mt-8 layout:flex-row layout:flex-wrap layout:gap-3">
            {content.actions.map((action) =>
              action.hrefMobile ? (
                <div key={action.label} className="contents">
                  <span className="w-full layout:hidden">
                    <ActionLink href={action.hrefMobile} variant="outline" className="w-full">
                      {action.label}
                    </ActionLink>
                  </span>
                  <span className="hidden layout:inline-flex">
                    <ActionLink href={action.href} variant="outline">
                      {action.label}
                    </ActionLink>
                  </span>
                </div>
              ) : (
                <ActionLink
                  key={action.label}
                  href={action.href}
                  variant={action.label.startsWith("VIEW") ? "solid" : "outline"}
                  className="w-full layout:w-auto"
                >
                  {action.label}
                </ActionLink>
              ),
            )}
          </div>
          <div data-note="" className="ink-note mt-3.5 flex items-start gap-2 pl-1 layout:mt-4">
            <HeroStartArrow />
            <span className="font-hand [transform:rotate(-2deg)] pt-4 text-lg leading-[1.25] layout:pt-6 layout:text-[19px]">
              {content.notes.start}
            </span>
          </div>
        </div>
        <figure className="layout:pb-1">
          <div className="border-signature border-ink bg-paper-light relative aspect-[4/5] overflow-hidden">
            {/* TODO: replace image */}
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              priority
              sizes={content.image.sizes}
              className="object-cover grayscale"
            />
          </div>
          <figcaption className="border-ink text-muted mt-2 flex justify-between border-t pt-1.5 font-mono text-xs tracking-[0.14em]">
            <span>{content.captionLeft}</span>
            <span>{content.captionRight}</span>
          </figcaption>
          <div data-note="" className="ink-note relative mt-5 hidden layout:block">
            <PortraitNoteArrow className="absolute -top-7 left-[10%]" />
            <p className="font-hand [transform:rotate(-1.4deg)] text-[19px] leading-[1.35] whitespace-pre-line">
              {content.notes.portrait}
            </p>
          </div>
          <p
            data-note=""
            className="ink-note font-hand mt-[18px] [transform:rotate(-1deg)] text-lg leading-[1.3] layout:hidden"
          >
            {content.notes.portraitShort}
          </p>
        </figure>
      </SiteContainer>
    </section>
  );
}
