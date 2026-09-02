import type { SVGProps } from "react";

type RoughUnderlineProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

/** A loose underline for calling out a word or short phrase. */
export function RoughUnderline({ title, ...props }: RoughUnderlineProps) {
  return (
    <svg
      viewBox="0 0 200 18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
      className={`ink-sketch ${props.className ?? ""}`}
    >
      {title ? <title>{title}</title> : null}
      <path d="M4 9.8C50.6 4.6 140.1 4.8 196 9.1" strokeWidth="3" />
      <path d="M5.8 12.2c47.4-4.8 135.8-4.6 188.7-1.2" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}
