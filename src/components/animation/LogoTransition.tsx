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
      gsap.set(container.current, { opacity: 1 });
      //   gsap.set(".black-bg", { xPercent: -50 });
      gsap.set(".black-bg .center", { scaleX: 0 });
      const offset = gsap.utils.selector(container.current)(".center")[0].clientWidth / 2;

      gsap.set(".home-icon", { x: offset - 24 });
      gsap.set(".ham-icon", { x: -offset + 24 });
      gsap.set(".black-bg .left", { x: offset });
      gsap.set(".black-bg .right", { x: -offset });

      let tl = gsap.timeline();
      tl.from(container.current!.children, {
        duration: 0.6,
        yPercent: 100,
      })
        .to(".left, .right, .home-icon, .ham-icon", {
          x: 0,
          delay: 0.2,
        })
        .to(
          ".center",
          {
            scaleX: 1,
            onComplete: () => {
              container.current?.children[0].children[0].classList.add("backdrop-blur-xl");
            },
          },
          "<",
        )
        .to(".other-icons", {
          opacity: 1,
          stagger: {
            ease: "power2.inOut",
            amount: 0.1,
          },
        });
    },
    { scope: container },
  );

  return (
    <nav ref={container} className={cx("relative overflow-hidden", className)}>
      {children}
    </nav>
  );
}
