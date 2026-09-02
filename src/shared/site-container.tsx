import type { HTMLAttributes, ReactNode } from "react";

type SiteContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function SiteContainer({ children, className = "", ...props }: SiteContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12 ${className}`} {...props}>
      {children}
    </div>
  );
}
