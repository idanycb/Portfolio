"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

export type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/**
 * In-page anchor link. When the target is on the current page it scrolls there
 * itself and replaces the history entry, so section jumps never pile up behind
 * the back button, and re-clicking the current hash still scrolls (next/link
 * ignores a click whose URL matches the current one). Links to another page
 * fall through to a normal next/link navigation.
 */
export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const url = new URL(href, window.location.href);
    const samePage =
      url.pathname === window.location.pathname && url.search === window.location.search;
    if (!samePage || !url.hash) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    // Next.js patches replaceState, so the router picks up the new hash too.
    window.history.replaceState(null, "", url.hash);
    // Follows the CSS scroll-behavior (smooth, auto under reduced motion) and
    // the target's scroll-margin-top.
    target.scrollIntoView();
    target.focus({ preventScroll: true });
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
