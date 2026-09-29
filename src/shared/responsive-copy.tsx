import type { ElementType, HTMLAttributes, ReactNode } from "react";

export type ResponsiveCopyProps = HTMLAttributes<HTMLElement> & {
  long: ReactNode;
  short?: ReactNode;
  as?: ElementType;
  longClassName?: string;
  shortClassName?: string;
  /** Where the long copy takes over. Tablet has room for most long copy. */
  at?: "tablet" | "layout";
};

// Literal class strings so Tailwind can see them.
const switchClasses = {
  tablet: { short: "tablet:hidden", long: "tablet:inline hidden" },
  layout: { short: "layout:hidden", long: "layout:inline hidden" },
};

export function ResponsiveCopy({
  long,
  short,
  as: Component = "span",
  className = "",
  longClassName = "",
  shortClassName = "",
  at = "layout",
  ...props
}: ResponsiveCopyProps) {
  if (short === undefined) {
    return (
      <Component className={className} {...props}>
        {long}
      </Component>
    );
  }

  return (
    <Component className={className} {...props}>
      <span className={`${switchClasses[at].short} whitespace-pre-line ${shortClassName}`}>
        {short}
      </span>
      <span className={`${switchClasses[at].long} whitespace-pre-line ${longClassName}`}>
        {long}
      </span>
    </Component>
  );
}
