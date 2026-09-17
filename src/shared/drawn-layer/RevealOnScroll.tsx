"use client";

import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement | SVGElement>("[data-anim]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-anim", "on");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <noscript>
      <style>{`[data-anim]{animation-play-state:running!important}`}</style>
    </noscript>
  );
}
