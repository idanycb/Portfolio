"use client";

import { useGSAP } from "@gsap/react";
import { cx } from "classix";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

interface Props extends PropsWithChildren {
  className?: string;
  as?: React.ElementType;
  tl?: gsap.core.Timeline;
  delay?: number;
  scrollTrigger?: true;
  duration?: number;
  from?: "top" | "bottom" | "left" | "right";
  clip?: boolean;
  [key: string]: unknown;
}

const directionMap: Record<string, GSAPTweenVars> = {
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
  ...props
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { opacity: 1 });

      gsap.from(container.current!.children, {
        duration: duration,
        ...directionMap[from],
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        delay: delay,
        scrollTrigger: scrollTrigger && {
          once: true,
          trigger: container.current,
          start: "clamp(top 80%)",
        },
      });
    },
    { scope: container },
  );

  return (
    <Component
      ref={container}
      className={cx("h-fit opacity-0", clip ? "overflow-hidden" : "overflow-visible", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
