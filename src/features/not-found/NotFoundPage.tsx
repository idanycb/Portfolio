import type { NotFoundContent } from "@/content/not-found";
import { ActionLink } from "@/shared/action-link";
import { inkStroke } from "@/shared/drawn-layer/ink-stroke";
import { PageDrawnLayer } from "@/shared/drawn-layer/PageDrawnLayer";
import { SiteContainer } from "@/shared/site-container";
import { SiteHeader } from "@/shared/site-header";

function WrongTurnArrow({ note }: { note: string }) {
  return (
    <div className="ink-note layout:mx-0 relative mx-auto w-full max-w-100">
      <svg viewBox="0 0 410 260" aria-hidden="true" className="ink h-auto w-full overflow-visible">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M385 104c-57-2-91 24-128 39-44 18-102 11-111-35-9-48 58-84 96-53 37 31 9 92-52 111-53 17-145-12-165-12"
            style={{ strokeWidth: inkStroke(2.4) }}
          />
          <path
            d="M49 135 25 154l24 19"
            style={{ strokeWidth: inkStroke(3) }}
            strokeLinejoin="miter"
          />
        </g>
      </svg>
      <p className="text-copy-muted font-hand layout:text-[1.5rem] absolute right-2 bottom-0 -rotate-6 text-[1.25rem] leading-[1.2] whitespace-pre-line">
        {note}
      </p>
    </div>
  );
}

export function NotFoundPage({ content }: { content: NotFoundContent }) {
  return (
    <div id="top" className="bg-paper text-ink relative min-h-dvh overflow-hidden">
      <PageDrawnLayer />
      <div
        data-grid=""
        className="ink-grid layout:block pointer-events-none absolute inset-0 z-0 hidden opacity-50"
        aria-hidden="true"
      >
        <div className="max-w-site mx-auto grid h-full grid-cols-6 px-12">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className="border-rule border-r border-dashed" />
          ))}
          <span />
        </div>
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="layout:py-12 flex flex-1 py-8">
          <SiteContainer className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-6">
              <p className="text-ink font-mono text-xs tracking-[0.18em]">{content.eyebrow}</p>
              <p className="text-copy-muted layout:block hidden font-mono text-xs leading-[1.45] tracking-[0.14em] whitespace-pre-line">
                {content.marginNote}
              </p>
            </div>

            <div className="tablet:grid-cols-[minmax(0,3fr)_minmax(13rem,1fr)] tablet:items-center tablet:gap-x-4 tablet:gap-y-0 layout:mt-16 layout:grid-cols-[minmax(0,3fr)_minmax(17rem,1fr)] mt-12 grid gap-8">
              <h1 className="font-display tablet:col-start-1 tablet:row-start-1 layout:text-[clamp(16rem,29vw,25rem)] text-[clamp(7.5rem,42vw,11rem)] leading-[0.7] font-black tracking-[-0.075em]">
                {content.errorCode}
              </h1>

              <div className="tablet:col-start-2 tablet:row-start-1 tablet:block hidden">
                <WrongTurnArrow note={content.note} />
              </div>

              <div className="tablet:col-span-2 tablet:row-start-2 layout:col-span-1 min-w-0">
                <p className="font-display layout:mt-8 layout:text-[clamp(2rem,3.6vw,3.25rem)] mt-12 text-[clamp(1.75rem,8vw,2.5rem)] leading-[0.92] font-black tracking-tighter">
                  {content.heading}
                </p>
                <p className="text-copy layout:text-[1.0625rem] mt-5 max-w-3xl font-sans text-base leading-normal">
                  {content.body}
                </p>
                <div className="layout:flex-row mt-7 flex flex-col gap-3">
                  {content.actions.map((action) => (
                    <ActionLink
                      key={action.href}
                      href={action.href}
                      variant="outline"
                      className="layout:w-auto layout:min-w-56 w-full"
                    >
                      {action.label}
                    </ActionLink>
                  ))}
                </div>
              </div>

              <div className="tablet:hidden">
                <WrongTurnArrow note={content.note} />
              </div>
            </div>

            <div className="min-h-12 flex-1" aria-hidden="true" />
            <div className="border-ink layout:flex-row layout:items-center layout:justify-between flex flex-col gap-3 border-t pt-4 font-mono text-xs leading-normal tracking-[0.14em]">
              <span>{content.footerLeft}</span>
              <span className="text-copy-muted">{content.footerRight}</span>
            </div>
          </SiteContainer>
        </main>
      </div>
    </div>
  );
}
