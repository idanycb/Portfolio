import type { ElementType, HTMLAttributes, ReactNode } from "react";

export type ResponsiveCopyProps = HTMLAttributes<HTMLElement> & {
  long: ReactNode;
  short?: ReactNode;
  as?: ElementType;
  longClassName?: string;
  shortClassName?: string;
};

export function ResponsiveCopy({
  long,
  short,
  as: Component = "span",
  className = "",
  longClassName = "",
  shortClassName = "",
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
      <span className={`whitespace-pre-line layout:hidden ${shortClassName}`}>{short}</span>
      <span className={`hidden whitespace-pre-line layout:inline ${longClassName}`}>{long}</span>
    </Component>
  );
}
