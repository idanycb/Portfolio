import type { SVGProps } from "react";

type RoughCircleProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

/** A deliberately uneven, current-color circle for editorial emphasis. */
export function RoughCircle({ title, ...props }: RoughCircleProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
      className={`ink-sketch ${props.className ?? ""}`}
    >
      {title ? <title>{title}</title> : null}
      <path d="M104 61.4c0 25.8-19.5 45.5-44.5 45.5-25.8 0-45.9-20.1-45.9-46.1 0-25.2 19.1-46.5 45.9-46.5 25.6 0 44.5 20.3 44.5 47.1Z" strokeWidth="3.2" />
      <path d="M101.1 59.1c1.4 25.2-17.7 44.2-42.7 45.2-25.8 1-43.1-20.1-42.2-45.1.8-24.6 19.5-42.7 43.7-42.2 24.8.6 39.9 18.2 41.2 42.1Z" strokeWidth="1.35" opacity="0.74" />
    </svg>
  );
}
