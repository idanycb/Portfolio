"use client";

import { LogoTransition } from "@/components/animation/LogoTransition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { hamburger_precompile } from "./data/icon-morph-precompile";
import homeIcon from "./img/home-normal.png";
gsap.registerPlugin(MorphSVGPlugin, useGSAP);

const urls = [
  {
    label: "Home",
    href: "/",
    icon: (
      <Image
        width={36}
        height={36}
        src={homeIcon}
        alt="home icon"
        priority
        className="home-icon min-h-[36px] min-w-[36px] rounded-full ring-4 ring-neutral-100 outline-1 outline-black"
      />
    ),
  },
  {
    label: "LinkedIn",
    mobileLabel: "LI",
    href: "https://www.linkedin.com/in/danycb",
    external: true,
  },
  {
    label: "GitHub",
    mobileLabel: "GH",
    href: "https://www.github.com/dany-cb",
    external: true,
  },
  {
    label: "Instagram",
    mobileLabel: "IG",
    href: "https://www.instagram.com/__danielthomas",
    external: true,
  },
];

interface Props {
  className?: string;
  ref: React.Ref<HTMLDivElement>;
  tl?: GSAPTimeline;
  setNavAnimationSet: (value: true) => void;
  menuRef?: React.RefObject<HTMLLIElement | null>;
}

let isAnimationConfigured = false;
export function NavBar({ className, ref, tl, setNavAnimationSet, menuRef }: Props) {
  const [morphTl, setMorphTl] = useState<GSAPTimeline>();
  const bodyEl = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      setMorphTl(tl);
      bodyEl.current = document.body;
    },
    { scope: menuRef },
  );

  const toggleMenu = () => {
    if (!isAnimationConfigured) {
      if (ref && typeof ref !== "function" && ref.current && tl && morphTl) {
        tl.to(ref.current, {
          maskPosition: "0% 100%",
          ease: "power2.inOut",
          onStart: () => {
            bodyEl.current!.style.overflow = "hidden";
            gsap.set(ref.current, { visibility: "visible", pointerEvents: "auto" });
          },
          onReverseComplete: () => {
            bodyEl.current!.style.overflow = "unset";
            gsap.set(ref.current, { visibility: "hidden", pointerEvents: "none" });
          },
        });

        if (menuRef && menuRef.current) {
          tl.to(
            menuRef.current!.children[0].children[0],
            {
              duration: 0.3,
              morphSVG: {
                shape: menuRef.current!.children[1].children[0] as SVGPathElement,
                shapeIndex: [-1, 0, 0],
                precompile: hamburger_precompile,
              },
              ease: "power2.inOut",
            },
            "<",
          );
        }

        isAnimationConfigured = true;
        setNavAnimationSet(true);
        // setMenuOpen((prev) => !prev);
      }
      return;
    }
    if (tl && morphTl) {
      tl.reversed(!tl.reversed());
    }
  };
  return (
    <LogoTransition className={className}>
      <div className="black-bg absolute top-0 h-full w-full">
        <div className="glassmorph flex h-full w-full overflow-hidden rounded-4xl">
          <div className="left aspect-1/2 w-auto rounded-l-full"></div>
          <div className="center w-full origin-center"></div>
          <div className="right aspect-1/2 w-auto rounded-r-full"></div>
        </div>
      </div>
      <ul className="flex h-fit w-full items-center justify-between px-8">
        {urls.map((url) => (
          <li key={url.label}>
            <Link
              aria-label={url.label}
              href={url.href}
              target={url.external ? "_blank" : undefined}
              rel={url.external ? "noopener noreferrer" : undefined}
            >
              {url.icon ?? (
                <>
                  <div className="other-icons hidden opacity-0 sm:block">{url.label}</div>
                  <div className="other-icons opacity-0 sm:hidden">{url.mobileLabel}</div>
                </>
              )}
            </Link>
          </li>
        ))}
        <li className="-z-20" ref={menuRef}>
          <AiOutlineMenu
            onClick={toggleMenu}
            className="ham-icon h-full w-full rounded-full bg-white p-2"
          />
          <AiOutlineClose className="close-icon hidden" />
        </li>
      </ul>
    </LogoTransition>
  );
}
