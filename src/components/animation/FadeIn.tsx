"use client";

import { useGSAP } from "@gsap/react";
import { cx } from "classix";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

interface Props extends PropsWithChildren {
  className?: string;
  tl?: gsap.core.Timeline;
  delay?: number;
  scrollTrigger?: true;
  duration?: number;
}

export function FadeIn({ children, className, duration = 0.6, tl, delay, scrollTrigger }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { opacity: 1 });

      gsap.from(container.current!.children, {
        duration: duration,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        delay: delay,
        scrollTrigger: scrollTrigger && {
          trigger: container.current,
          start: "clamp(top center)",
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className={cx("h-fit overflow-hidden opacity-0", className)}>
      {children}
    </div>
  );
}
