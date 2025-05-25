"use client";

import { useGSAP } from "@gsap/react";
import { cx } from "classix";
import gsap from "gsap";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP);

interface Props extends PropsWithChildren {
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function LogoTransition({ children, className }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current!.children, { opacity: 1 });
      //   gsap.set(".black-bg", { xPercent: -50 });
      gsap.set(".black-bg .center", { scaleX: 0 });
      gsap.set(".black-bg .left", { x: 130 });
      gsap.set(".black-bg .right", { x: -130 });

      let tl = gsap.timeline();
      tl.from(container.current!.children, {
        duration: 0.6,
        yPercent: 100,
      })
        .to(".left, .right", {
          x: 0,
          delay: 0.2,
        })
        .to(
          ".center",
          {
            scaleX: 1,
          },
          "<",
        )
        .to(".other-icons", {
          opacity: 1,
          stagger: {
            from: "center",
            ease: "power2.inOut",
            amount: 0.1,
          },
        });
    },
    { scope: container },
  );

  return (
    <div ref={container} className={cx("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
