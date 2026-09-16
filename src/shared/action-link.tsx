import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ActionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string;
  variant?: "solid" | "outline" | "text";
};

const variants = {
  solid: "bg-ink text-paper hover:bg-ink-soft hover:text-paper",
  outline: "border-signature border-ink text-ink hover:bg-ink hover:text-paper",
  text: "border-b border-ink pb-1 text-ink hover:text-link-hover",
};

export function ActionLink({
  children,
  className = "",
  href,
  rel,
  target,
  variant = "solid",
  ...props
}: ActionLinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const externalTarget = !isInternal && href.startsWith("http") ? (target ?? "_blank") : target;
  const safeRel = externalTarget === "_blank" ? (rel ?? "noopener noreferrer") : rel;
  const framing = variant === "text" ? "" : "px-5 py-3";
  const classes = `inline-flex min-h-11 w-fit items-center justify-center whitespace-nowrap font-display text-xs font-bold tracking-[0.02em] transition-[color,background-color,transform] duration-150 active:translate-y-px ${framing} ${variants[variant]} ${className}`;

  return isInternal ? (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  ) : (
    <a className={classes} href={href} rel={safeRel} target={externalTarget} {...props}>
      {children}
    </a>
  );
}
