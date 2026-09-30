"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Scroll distance in one direction before the header reacts, so trackpad
// jitter and small corrections don't flicker it. Showing needs a deliberate
// scroll up; a nudge while reading shouldn't bring the header back.
const HIDE_AFTER = 32;
const SHOW_AFTER = 80;

/**
 * Sticky header that slides away while the reader scrolls down and slides back
 * on scroll up. It stays shown near the top of the page and while anything
 * inside it has focus. The visible height is published as
 * `--site-header-offset` on <html> so other sticky elements can sit below it.
 */
export function AutoHideHeader({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;

    let hidden = false;
    let lastY = window.scrollY;
    let travel = 0;
    let frame = 0;

    function apply(nextHidden: boolean) {
      hidden = nextHidden;
      header!.dataset.hidden = String(nextHidden);
      root.style.setProperty(
        "--site-header-offset",
        nextHidden ? "0px" : `${header!.offsetHeight}px`,
      );
    }

    function update() {
      frame = 0;
      const maxY = root.scrollHeight - window.innerHeight;
      // Clamp so iOS overscroll bounce at either end doesn't read as a direction change.
      const y = Math.min(Math.max(window.scrollY, 0), maxY);
      const delta = y - lastY;
      lastY = y;
      if (delta === 0) return;

      if (y <= header!.offsetHeight) {
        travel = 0;
        if (hidden) apply(false);
        return;
      }
      // Reset the tally whenever the direction flips.
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;

      if (!hidden && travel > HIDE_AFTER && !header!.contains(document.activeElement)) {
        travel = 0;
        apply(true);
      } else if (hidden && travel < -SHOW_AFTER) {
        travel = 0;
        apply(false);
      }
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function onFocusIn() {
      if (hidden) apply(false);
    }

    const resize = new ResizeObserver(() => apply(hidden));
    resize.observe(header);
    apply(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocusIn);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocusIn);
      resize.disconnect();
      root.style.removeProperty("--site-header-offset");
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-hidden="false"
      className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[hidden=true]:-translate-y-full motion-reduce:transition-none ${className}`}
    >
      {children}
    </header>
  );
}
