import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({ title, eyebrow, intro, id, className = "" }: SectionHeadingProps) {
  return (
    <header className={`max-w-3xl ${className}`}>
      {eyebrow ? <p className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-muted uppercase">{eyebrow}</p> : null}
      <h2 id={id} className="mt-3 font-display text-4xl leading-[0.95] font-black tracking-[-0.055em] text-ink sm:text-5xl">
        {title}
      </h2>
      {intro ? <p className="mt-5 max-w-[62ch] text-base leading-7 text-ink-soft">{intro}</p> : null}
    </header>
  );
}
