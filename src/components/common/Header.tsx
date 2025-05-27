"use client";

import { NavBar } from "@/features/navigation";
import { HiddenMenu } from "@/features/navigation/HiddenMenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<GSAPTimeline>();
  const [navAnimationSet, setNavAnimationSet] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      setTl(tl);
    },
    { scope: containerRef },
  );

  return (
    <header className="fixed bottom-0 z-50 flex h-0 w-full justify-center overflow-visible">
      <div
        className="pointer-events-none invisible fixed bottom-0 flex h-svh w-full justify-center bg-white mask-t-from-50% mask-size-[100%_200%] mask-[0%_-100%] mask-no-repeat"
        ref={containerRef}
      >
        <HiddenMenu tl={tl} navAnimationSet={navAnimationSet} />
      </div>
      <div className="absolute bottom-4 w-full max-w-md px-4">
        <NavBar
          menuRef={menuRef}
          tl={tl}
          ref={containerRef}
          setNavAnimationSet={setNavAnimationSet}
          className="py-2 opacity-0"
        />
      </div>
    </header>
  );
}
