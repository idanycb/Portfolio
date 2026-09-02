import type { SVGProps } from "react";

type RoughArrowProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

/** A hand-drawn directional arrow that inherits the surrounding text color. */
export function RoughArrow({ title, ...props }: RoughArrowProps) {
  return (
    <svg
      viewBox="0 0 160 72"
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
      <path d="M8 39.8c26.4-5.2 65.1-7.9 113.6-5.5" strokeWidth="3.2" />
      <path d="M116.5 13.5c8.5 7.8 17.2 16.9 28.9 22.5-10.5 5.9-20.7 13.7-29.3 23.6" strokeWidth="3.2" />
      <path d="M10.2 42.8c35.7-7.9 75.1-6.3 111.8-4.5M119.3 16.6c7.7 7.3 17.4 14.8 25.3 19.2-10.2 7.2-18.6 14.3-25.5 21.1" strokeWidth="1.25" opacity="0.72" />
    </svg>
  );
}
