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
    <dl
      className={`border-rule tablet:grid-cols-2 layout:grid-cols-4 grid gap-x-6 gap-y-5 border-y py-5 ${className}`}
    >
      {items.map((item, index) => (
        <div key={index}>
          <dt className="text-muted font-mono text-[0.625rem] tracking-[0.16em] uppercase">
            {item.label}
          </dt>
          <dd className="text-ink-soft mt-1.5 text-sm leading-5">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
