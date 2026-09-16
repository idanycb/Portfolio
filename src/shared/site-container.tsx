import type { HTMLAttributes, ReactNode } from "react";

type SiteContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function SiteContainer({ children, className = "", ...props }: SiteContainerProps) {
  return (
    <div className={`max-w-site mx-auto w-full px-5 md:px-12 ${className}`} {...props}>
      {children}
    </div>
  );
}
