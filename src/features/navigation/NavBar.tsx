"use client";

import { LogoTransition } from "@/components/animation/LogoTransition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
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
        className="home-icon min-h-9 min-w-9 rounded-full ring-4 ring-neutral-100 outline-1 outline-black"
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
}

export function NavBar({ className }: Props) {
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
        <li className="-z-20">
          <AiOutlineMenu className="ham-icon h-full w-full rounded-full bg-white p-2" />
          <AiOutlineClose className="close-icon hidden" />
        </li>
      </ul>
    </LogoTransition>
  );
}
