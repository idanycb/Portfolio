import type { HTMLAttributes, ReactNode } from "react";

type SiteContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function SiteContainer({ children, className = "", ...props }: SiteContainerProps) {
  return (
    <div
      className={`max-w-site tablet:px-8 layout:px-12 mx-auto w-full px-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
