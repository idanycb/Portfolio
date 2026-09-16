import { ResponsiveCopy } from "@/shared/responsive-copy";

type NavItem = { href: string; label: string; labelShort?: string };

export function CaseStudyNav({
  items,
  label,
  navLabel,
}: {
  items: readonly NavItem[];
  label: string;
  navLabel: string;
}) {
  return (
    <aside className="hidden border-r-[1.5px] border-ink bg-band px-8 py-9 md:block">
      <div className="sticky top-8">
        <p className="font-mono text-[0.625rem] font-bold tracking-[0.16em] text-muted">{label}</p>
        <nav aria-label={navLabel} className="mt-5">
          <ol className="space-y-1">
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="grid min-h-9 grid-cols-[1.25rem_1fr] items-center border-l-2 border-transparent pl-3 font-mono text-[0.6875rem] font-bold tracking-[0.07em] text-copy-muted transition-colors hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink"
                >
                  <span className="text-muted">{index + 1}</span>
                  <ResponsiveCopy long={item.label} short={item.labelShort} />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
