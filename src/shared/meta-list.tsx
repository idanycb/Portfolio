import type { ReactNode } from "react";

export type MetaListItem = {
  label: ReactNode;
  value: ReactNode;
};

type MetaListProps = {
  items: readonly MetaListItem[];
  className?: string;
};

export function MetaList({ items, className = "" }: MetaListProps) {
  return (
    <dl className={`grid gap-x-6 gap-y-5 border-y border-rule py-5 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index}>
          <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">{item.label}</dt>
          <dd className="mt-1.5 text-sm leading-5 text-ink-soft">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
