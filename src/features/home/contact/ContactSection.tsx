import { ContactEnvelope, ContactNoteArrow } from "@/components/svg/HomeDrawings";
import type { HomepageContent } from "@/content/home";
import { ActionLink } from "@/shared/action-link";
import { ResponsiveCopy } from "@/shared/responsive-copy";
import { SiteContainer } from "@/shared/site-container";

type ContactSectionProps = { content: HomepageContent["contact"]; email: string; phone: string };

export function ContactSection({ content, email, phone }: ContactSectionProps) {
  const emailAction = content.actions.find((action) => action.href.startsWith("mailto:"));
  const phoneAction = content.actions.find((action) => action.href.startsWith("tel:"));

  return (
    <section
      id="contact"
      className="border-ink relative scroll-mt-32 overflow-hidden border-b-[1.6px] py-11 pb-12 layout:py-24 layout:pb-[100px]"
    >
      <ContactEnvelope className="pointer-events-none absolute bottom-[-70px] left-11 hidden opacity-[.14] layout:block" />
      <SiteContainer className="grid gap-10 layout:grid-cols-2 layout:gap-[72px]">
        <div className="min-w-0">
          <p className="text-muted font-mono text-xs font-bold tracking-[0.14em]">
            {content.label}
          </p>
          <h2 className="font-display text-ink mt-4 text-[clamp(2.625rem,13vw,3.25rem)] leading-[0.84] font-black tracking-[-0.062em] whitespace-pre-line layout:mt-5 layout:text-[clamp(3.5rem,7.4vw,5.75rem)]">
            {content.heading}
          </h2>
          <p className="text-copy mt-6 max-w-md text-base leading-[1.5] font-semibold layout:mt-7 layout:text-[1.0625rem]">
            {content.body}
          </p>
          <div className="mt-6 hidden flex-wrap items-center gap-4 layout:flex">
            {content.actions.slice(0, 2).map((action) => (
              <ActionLink
                key={action.label}
                href={action.href}
                variant={action.href.startsWith("mailto:") ? "text" : "outline"}
              >
                {action.label}
              </ActionLink>
            ))}
          </div>
        </div>
        <div className="min-w-0 layout:pt-9">
          <p className="text-muted font-mono text-[0.59375rem] tracking-[0.18em] layout:text-[0.625rem]">GET IN TOUCH</p>
          <ul className="border-ink mt-4 border-t">
            {content.prompts.map((prompt) => (
              <li
                key={prompt.label}
                className="border-rule text-copy-muted border-b py-4 font-mono text-[0.59375rem] tracking-[0.14em] layout:text-[0.625rem]"
              >
                <ResponsiveCopy long={prompt.label} short={prompt.labelShort} />
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {/* The exports render these as plain mono links — underlined on
                desktop — rather than filled buttons. */}
            {emailAction ? (
              <a
                href={emailAction.href}
                className="text-ink hover:text-link-hover inline-flex min-h-11 items-center font-mono text-xs font-bold tracking-[0.06em] layout:min-h-0 layout:border-b-[1.6px] layout:border-ink layout:pb-0.5 layout:text-[0.8125rem]"
              >
                {emailAction.labelShort ?? emailAction.label}
              </a>
            ) : null}
            {phoneAction ? (
              <a
                href={phoneAction.href}
                className="text-ink hover:text-link-hover inline-flex min-h-11 items-center font-mono text-xs font-bold tracking-[0.06em] layout:min-h-0 layout:border-b-[1.6px] layout:border-ink layout:pb-0.5 layout:text-[0.8125rem]"
              >
                {phoneAction.label}
              </a>
            ) : null}
          </div>
          <div data-note="" className="ink-note mt-3 flex items-center gap-2">
            <ContactNoteArrow className="h-[34px] w-[52px] overflow-visible layout:h-10 layout:w-[66px]" />
            <span className="font-hand text-copy-muted text-[17px] leading-[1.25] layout:text-lg">
              {content.note}
            </span>
          </div>
          <div className="border-rule text-copy-muted mt-5 flex flex-col items-start border-t pt-2 font-mono text-xs leading-[1.9] tracking-[0.08em]">
            <a
              href={`mailto:${email}`}
              className="hover:text-link-hover inline-flex min-h-11 min-w-11 items-center"
            >
              {email.toUpperCase()}
            </a>
            <a
              href={`tel:${phone.replaceAll(" ", "")}`}
              className="hover:text-link-hover inline-flex min-h-11 min-w-11 items-center"
            >
              {phone}
            </a>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
