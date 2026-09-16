import Image from "next/image";

import type { HomepageContent } from "@/content/home";
import { ActionLink } from "@/shared/action-link";
import { SiteContainer } from "@/shared/site-container";

type HeroSectionProps = { content: HomepageContent["hero"] };

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="border-ink border-b-[1.6px] py-[34px] pb-11 md:py-[72px] md:pb-24">
      <SiteContainer className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(19rem,1fr)] md:items-end md:gap-16">
        <div>
          <p className="animate-fi text-muted font-mono text-[0.59375rem] tracking-[0.24em]">
            {content.eyebrow}
          </p>
          <h1 className="text-home-hero animate-fu font-display text-ink mt-1.5 font-black">
            {content.title}
          </h1>
          <h2 className="animate-fu font-display text-ink mt-7 max-w-xl text-[1.6875rem] leading-[1.1] font-extrabold tracking-[-0.03em] md:mt-10 md:text-[clamp(1.875rem,3vw,2.75rem)]">
            {content.subtitle}
          </h2>
          <p className="animate-fu text-copy mt-3.5 max-w-xl text-[1.0625rem] leading-[1.5] md:mt-4 md:text-[1.3125rem]">
            {content.body}
          </p>
          <div className="border-rule mt-6 max-w-xl border-t pt-4 md:mt-8">
            <p className="text-copy-muted text-sm leading-[1.55] md:text-[0.9375rem]">
              {content.education}
            </p>
            <p className="text-ink mt-2.5 font-mono text-[0.71875rem] leading-[1.9] font-bold tracking-[0.1em] md:text-xs">
              {content.skills.join(" · ")}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2.5 md:mt-8 md:flex-row md:flex-wrap md:gap-3">
            {content.actions.map((action) =>
              action.hrefMobile ? (
                <div key={action.label} className="contents">
                  <span className="w-full md:hidden">
                    <ActionLink href={action.hrefMobile} variant="outline" className="w-full">
                      {action.label}
                    </ActionLink>
                  </span>
                  <span className="hidden md:inline-flex">
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
                  className="w-full md:w-auto"
                >
                  {action.label}
                </ActionLink>
              ),
            )}
          </div>
        </div>
        <figure className="md:pb-1">
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
          <figcaption className="border-ink text-muted mt-2 flex justify-between border-t pt-1.5 font-mono text-[0.5625rem] tracking-[0.14em]">
            <span>{content.captionLeft}</span>
            <span>{content.captionRight}</span>
          </figcaption>
        </figure>
      </SiteContainer>
    </section>
  );
}
