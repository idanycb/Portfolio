import { RailNoteArrow } from "@/components/svg/CaseStudyDrawings";
import { ResponsiveCopy } from "@/shared/responsive-copy";

type NavItem = { href: string; label: string; labelShort?: string };

export function CaseStudyNav({
  items,
  label,
  navLabel,
  note,
}: {
  items: readonly NavItem[];
  label: string;
  navLabel: string;
  note: string;
}) {
  return (
    <aside className="border-ink bg-band hidden border-r-[1.5px] px-8 py-9 md:block">
      <div className="sticky top-8">
        <p className="text-muted font-mono text-[0.625rem] font-bold tracking-[0.16em]">{label}</p>
        <nav aria-label={navLabel} className="mt-5">
          <ol className="space-y-1">
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-copy-muted hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink grid min-h-9 grid-cols-[1.25rem_1fr] items-center border-l-2 border-transparent pl-3 font-mono text-[0.6875rem] font-bold tracking-[0.07em] transition-colors"
                >
                  <span className="text-muted">{index + 1}</span>
                  <ResponsiveCopy long={item.label} short={item.labelShort} />
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div data-note="" className="ink-note mt-7">
          <RailNoteArrow />
          <p className="font-hand text-copy-muted mt-1.5 text-base leading-[1.3]">{note}</p>
        </div>
      </div>
    </aside>
  );
}
