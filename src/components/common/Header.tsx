"use client";

import { NavBar } from "@/features/navigation";
import { HiddenMenu } from "@/features/navigation/HiddenMenu";
import { useGSAP } from "@gsap/react";
import cx from "classix";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<GSAPTimeline>();
  useGSAP(
    () => {
      const tl = gsap.timeline();
      setTl(tl);
    },
    { scope: containerRef },
  );
  return (
    <header className="fixed bottom-0 z-50 flex h-full w-full justify-center">
      <div
        ref={containerRef}
        className={cx(
          "flex w-full justify-center bg-white",
          "invisible mask-t-from-50% mask-size-[100%_200%] mask-[0%_-100%] mask-no-repeat",
        )}
      >
        <HiddenMenu className="font-heading h-full w-full max-w-md px-4 pt-4 pb-12 text-[10px] lg:text-[12px]" />
      </div>
      <div className="absolute bottom-4 w-full max-w-md px-4">
        <NavBar tl={tl} ref={containerRef} className={cx("py-2", "opacity-0")} />
      </div>
    </header>
  );
}
