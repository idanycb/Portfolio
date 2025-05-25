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
}

export function TextFadeIn({
  children,
  className,
  tl,
  as: Cmp = "p",
  delay,
  scrollTrigger,
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current!.children, { opacity: 1 });

      SplitText.create(container.current!.children, {
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
            delay: delay,
            scrollTrigger: scrollTrigger && {
              trigger: container.current,
              start: "clamp(top 80% )",
            },
          });
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className={cx("h-fit overflow-hidden", className)}>
      <Cmp className="opacity-0">{children}</Cmp>
    </div>
  );
}
