import type { AnchorHTMLAttributes, ReactNode } from "react";

import { HashLink } from "./hash-link";

export type ActionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string;
  variant?: "solid" | "outline" | "text";
  /** Hero actions are 13px in the exports; the work-card actions are 12.5px. */
  size?: "default" | "compact";
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
  size = "default",
  ...props
}: ActionLinkProps) {
  // Downloads bypass next/link: a file is not a route to prefetch or navigate to.
  const isInternal = (href.startsWith("/") || href.startsWith("#")) && !props.download;
  const externalTarget = !isInternal && href.startsWith("http") ? (target ?? "_blank") : target;
  const safeRel = externalTarget === "_blank" ? (rel ?? "noopener noreferrer") : rel;
  const framing = variant === "text" ? "" : "px-5 py-3";
  // Desktop hero actions carry .02em tracking in the export; everything else has none.
  const sizing =
    size === "compact"
      ? "text-[0.78125rem] tracking-normal"
      : "text-[0.8125rem] tracking-normal layout:tracking-[0.02em]";
  const classes = `inline-flex min-h-11 w-fit items-center justify-center whitespace-nowrap font-display font-extrabold ${sizing} transition-[color,background-color,transform] duration-150 active:translate-y-px ${framing} ${variants[variant]} ${className}`;

  return isInternal ? (
    <HashLink className={classes} href={href} {...props}>
      {children}
    </HashLink>
  ) : (
    <a className={classes} href={href} rel={safeRel} target={externalTarget} {...props}>
      {children}
    </a>
  );
}
