"use client";

import { useEffect, useRef } from "react";

// Must equal the --ink-wobble default in globals.css.
export const INK_WOBBLE_FALLBACK = 0.9;

export function InkFilter() {
  const displacementMap = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const cssValue = getComputedStyle(document.documentElement).getPropertyValue("--ink-wobble");
    const parsedValue = Number.parseFloat(cssValue);
    const scale = Number.isFinite(parsedValue)
      ? Math.min(3, Math.max(0, parsedValue))
      : INK_WOBBLE_FALLBACK;

    displacementMap.current?.setAttribute("scale", String(scale));
  }, []);

  return (
    <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true">
      <defs>
        <filter id="ink">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="1"
            seed="4"
            result="n"
          />
          <feDisplacementMap
            ref={displacementMap}
            id="inkmap"
            in="SourceGraphic"
            in2="n"
            scale={INK_WOBBLE_FALLBACK}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
