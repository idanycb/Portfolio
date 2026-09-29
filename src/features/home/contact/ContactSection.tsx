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
      <SiteContainer className="layout:grid-cols-2 layout:gap-x-24 tablet:gap-14 grid gap-12">
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
          <div className="tablet:flex-row tablet:flex-wrap tablet:items-center tablet:gap-x-12 layout:mt-10 mt-8 flex flex-col items-start gap-4">
            {content.actions.map((action) => (
              <ActionLink
                key={action.label}
                href={action.href}
                download={action.download}
                variant={action.download ? "outline" : "text"}
                className={action.download ? "tablet:w-fit tablet:px-9 w-full" : undefined}
              >
                {action.labelShort ?? action.label}
              </ActionLink>
            ))}
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
          <div data-note="" className="ink-note mt-5 flex items-center gap-3">
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
