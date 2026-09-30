import { ContactFormUnderline, ContactNoteArrow } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ActionLink } from "@/shared/action-link";
import { SiteContainer } from "@/shared/site-container";

import { ContactForm } from "./ContactForm";

type ContactSectionProps = { content: HomepageContent["contact"] };

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="border-ink tablet:py-16 layout:py-24 layout:pb-[100px] border-b-signature relative scroll-mt-32 overflow-hidden py-11 pb-12"
    >
      <SiteContainer className="layout:grid-cols-2 layout:gap-x-[clamp(2.5rem,10vw-3rem,6rem)] tablet:gap-14 grid gap-12">
        <div className="min-w-0">
          <p className="text-muted font-mono text-xs font-bold tracking-[0.14em]">
            {content.label}
          </p>
          <h2 className="font-display text-ink tablet:text-[clamp(3.25rem,5.83vw,3.5rem)] layout:mt-5 layout:text-[clamp(3.5rem,5.1vw,4.75rem)] mt-4 text-[clamp(2.625rem,13vw,3.25rem)] leading-[0.84] font-black tracking-[-0.062em] text-balance whitespace-pre-line">
            {content.heading}
          </h2>
          <p className="text-copy layout:mt-7 layout:text-[1.0625rem] mt-6 max-w-md text-base leading-[1.5] font-semibold">
            {content.body}
          </p>
          {/* The desktop column is narrow at 960, so the gap and button padding
              shrink with it to keep both actions on one row. */}
          <div className="tablet:flex-row tablet:flex-wrap tablet:items-center tablet:gap-x-12 tablet:gap-y-4 layout:mt-10 layout:gap-x-[clamp(1.25rem,2.25vw,3rem)] mt-8 flex flex-col gap-2.5">
            {content.actions.map((action) =>
              action.download ? (
                <ActionLink
                  key={action.label}
                  href={action.href}
                  download
                  variant="solid"
                  className="tablet:w-fit tablet:px-9 layout:px-[clamp(1.25rem,2.35vw,2.25rem)] w-full"
                >
                  {action.labelShort ?? action.label}
                </ActionLink>
              ) : (
                /* Stacked on mobile, an underlined link under a full-width
                   button looks stray, so it becomes a matching button. */
                <div key={action.label} className="contents">
                  <span className="tablet:hidden block">
                    <ActionLink href={action.href} variant="outline" className="w-full">
                      {action.labelShort ?? action.label}
                    </ActionLink>
                  </span>
                  <span className="tablet:contents hidden">
                    <ActionLink href={action.href} variant="text">
                      {action.labelShort ?? action.label}
                    </ActionLink>
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="layout:pt-9 min-w-0">
          <div className="w-fit">
            <h3 className="font-display text-ink text-case-section font-black">
              {content.form.heading}
            </h3>
            <ContactFormUnderline className="text-ink mt-2 w-3/4" />
          </div>
          <ContactForm content={content.form} />
          <div data-note="" className="ink-note flex items-center gap-3">
            <ContactNoteArrow className="layout:h-10 layout:w-[66px] h-[34px] w-[52px] shrink-0 overflow-visible" />
            <span className="font-hand text-copy-muted layout:text-lg text-[17px] leading-[1.25]">
              {content.note}
            </span>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
