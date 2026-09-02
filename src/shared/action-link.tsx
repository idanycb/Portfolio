import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
};

const variants = {
  solid: "bg-ink text-paper hover:bg-ink-soft",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  text: "border-b border-ink pb-1 text-ink hover:text-ink-muted",
};

export function ActionLink({ children, className = "", variant = "solid", ...props }: ActionLinkProps) {
  const framing = variant === "text" ? "" : "px-5 py-3";

  return (
    <a
      className={`inline-flex w-fit items-center justify-center font-display text-xs font-bold tracking-[0.02em] whitespace-nowrap transition-colors duration-150 ${framing} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
