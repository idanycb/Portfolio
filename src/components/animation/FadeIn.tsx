"use client";

import { cx } from "classix";
import { PropsWithChildren, useEffect, useRef } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  as?: React.ElementType;
  delay?: number;
  scrollTrigger?: true;
  duration?: number;
  from?: "top" | "bottom" | "left" | "right";
  clip?: boolean;
  lcp?: boolean;
  [key: string]: unknown;
}

const directionMap: Record<string, { yPercent?: number; xPercent?: number }> = {
  top: { yPercent: -100 },
  bottom: { yPercent: 100 },
  left: { xPercent: -100 },
  right: { xPercent: 100 },
};

export function FadeIn({
  children,
  className,
  as: Component = "div",
  duration = 0.8,
  from = "bottom",
  delay,
  scrollTrigger,
  clip = true,
  lcp = false,
  ...props
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let canceled = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (canceled || !container.current) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (!container.current) return;
        gsap.set(container.current, { opacity: 1 });
        gsap.from(container.current.children, {
          duration,
          ...directionMap[from],
          ...(lcp ? {} : { opacity: 0 }),
          stagger: 0.2,
          ease: "expo.out",
          delay,
          scrollTrigger: scrollTrigger
            ? {
                once: true,
                trigger: container.current,
                start: "clamp(top 80%)",
              }
            : undefined,
        });
      }, container);

      cleanup = () => ctx.revert();
    };

    run();

    return () => {
      canceled = true;
      cleanup?.();
    };
  }, [delay, duration, from, lcp, scrollTrigger]);

  return (
    <Component
      ref={container}
      className={cx("h-fit", lcp ? "" : "opacity-0", clip ? "overflow-hidden" : "overflow-visible", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
