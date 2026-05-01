"use client";

import { cx } from "classix";
import { PropsWithChildren, useEffect, useRef } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  as?: React.ElementType;
  delay?: number;
  scrollTrigger?: true;
  singleLine?: true;
  [key: string]: unknown;
}

export function TextFadeIn({
  children,
  className,
  as: Cmp = "p",
  delay,
  singleLine,
  scrollTrigger,
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

      const ctx = gsap.context(async () => {
        if (!container.current) return;
        gsap.set(container.current.children, { opacity: 1 });

        if (singleLine) {
          gsap.from(container.current.children, {
            duration: 0.6,
            yPercent: 100,
            opacity: 0,
            ease: "expo.out",
            delay,
          });
          return;
        }

        const splitTextModule = await import("gsap/SplitText");
        if (canceled || !container.current) return;
        const SplitText = splitTextModule.SplitText;
        gsap.registerPlugin(SplitText);

        SplitText.create(container.current.children, {
          type: "words,lines",
          linesClass: "line",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            return gsap.from(self.lines, {
              duration: 0.6,
              yPercent: 100,
              opacity: 0,
              stagger: 0.1,
              ease: "expo.out",
              delay,
              scrollTrigger: scrollTrigger
                ? {
                    once: true,
                    trigger: container.current,
                    start: "clamp(top 90% )",
                  }
                : undefined,
            });
          },
        });
      }, container);

      cleanup = () => ctx.revert();
    };

    run();

    return () => {
      canceled = true;
      cleanup?.();
    };
  }, [delay, scrollTrigger, singleLine]);

  return (
    <div ref={container} className={cx("h-fit overflow-hidden", className)}>
      <Cmp className="opacity-0" {...props}>
        {children}
      </Cmp>
    </div>
  );
}
