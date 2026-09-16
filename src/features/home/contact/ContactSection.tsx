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
      className="border-ink scroll-mt-32 border-b-[1.6px] py-11 pb-12 md:py-24 md:pb-[100px]"
    >
      <SiteContainer className="grid gap-10 md:grid-cols-2 md:gap-[72px]">
        <div>
          <p className="text-muted font-mono text-[0.625rem] font-bold tracking-[0.14em]">
            {content.label}
          </p>
          <h2 className="font-display text-ink mt-4 text-[3.25rem] leading-[0.84] font-black tracking-[-0.062em] whitespace-pre-line md:mt-5 md:text-[clamp(3.5rem,7.4vw,5.75rem)]">
            {content.heading}
          </h2>
          <p className="text-copy mt-6 max-w-md text-[1.0625rem] leading-[1.5] font-semibold md:mt-7">
            {content.body}
          </p>
          <div className="mt-6 hidden flex-wrap items-center gap-4 md:flex">
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
        <div className="md:pt-9">
          <p className="text-muted font-mono text-[0.625rem] tracking-[0.18em]">GET IN TOUCH</p>
          <ul className="border-ink mt-4 border-t">
            {content.prompts.map((prompt) => (
              <li
                key={prompt.label}
                className="border-rule text-copy-muted border-b py-4 font-mono text-[0.625rem] tracking-[0.14em]"
              >
                <ResponsiveCopy long={prompt.label} short={prompt.labelShort} />
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            {emailAction ? (
              <ActionLink href={emailAction.href} className="w-full sm:w-auto">
                {emailAction.labelShort ?? emailAction.label}
              </ActionLink>
            ) : null}
            {phoneAction ? (
              <ActionLink href={phoneAction.href} variant="outline" className="w-full sm:w-auto">
                {phoneAction.label}
              </ActionLink>
            ) : null}
          </div>
          <div className="border-rule text-copy-muted mt-5 border-t pt-4 font-mono text-[0.6875rem] leading-[1.9] tracking-[0.08em]">
            <a href={`mailto:${email}`} className="hover:text-link-hover block w-fit">
              {email.toUpperCase()}
            </a>
            <a
              href={`tel:${phone.replaceAll(" ", "")}`}
              className="hover:text-link-hover mt-1 block w-fit"
            >
              {phone}
            </a>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
