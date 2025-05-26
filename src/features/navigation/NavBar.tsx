"use client";

import { LogoTransition } from "@/components/animation/LogoTransition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
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
        className="home-icon min-h-[36px] min-w-[36px] rounded-full ring-4 ring-neutral-100 outline-1 outline-black"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-profile",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://www.github.com/your-profile",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/your-profile",
    external: true,
  },
];

interface Props {
  className?: string;
  ref: React.Ref<HTMLDivElement>;
  tl?: GSAPTimeline;
}

let isAnimationConfigured = false;
export function NavBar({ className, ref, tl }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const [morphTl, setMorphTl] = useState<GSAPTimeline>();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      setMorphTl(tl);
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
            gsap.set(ref.current, { visibility: "visible" });
          },
          onReverseComplete: () => {
            gsap.set(ref.current, { visibility: "hidden" });
          },
        });

        morphTl.to(menuRef.current!.children[0].children[0], {
          duration: 0.3,
          morphSVG: {
            shape: menuRef.current!.children[1].children[0] as SVGPathElement,
            shapeIndex: [-1, 0, 0],
            precompile: [
              "M906.5216,472.4096 C907.3152,472.6752 908.0544,473.0624 908.7168,473.5488 909.3792,474.0352 909.9648,474.6208 910.4512,475.2832 910.9376,475.9456 911.3248,476.6848 911.5904,477.4784 911.856,478.272 912,479.12 912,480 912,485.33333 912,490.66667 912,496 912,501.33333 912,506.66667 912,512 912,517.33333 912,522.66667 912,528 912,533.33333 912,538.66667 912,544 912,544.88 911.856,545.728 911.5904,546.5216 911.3248,547.3152 910.9376,548.0544 910.4512,548.7168 909.9648,549.3792 909.3792,549.9648 908.7168,550.4512 908.0544,550.9376 907.3152,551.3248 906.5216,551.5904 905.728,551.856 904.88,552 904,552 838.66667,552 773.33333,552 708,552 642.66667,552 577.33333,552 512,552 446.66667,552 381.33333,552 316,552 250.66667,552 185.33333,552 120,552 119.12,552 118.272,551.856 117.4784,551.5904 116.6848,551.3248 115.9456,550.9376 115.2832,550.4512 114.6208,549.9648 114.0352,549.3792 113.5488,548.7168 113.0624,548.0544 112.6752,547.3152 112.4096,546.5216 112.144,545.728 112,544.88 112,544 112,538.66667 112,533.33333 112,528 112,522.66667 112,517.33333 112,512 112,506.66667 112,501.33333 112,496 112,490.66667 112,485.33333 112,480 112,479.12 112.144,478.272 112.4096,477.4784 112.6752,476.6848 113.0624,475.9456 113.5488,475.2832 114.0352,474.6208 114.6208,474.0352 115.2832,473.5488 115.9456,473.0624 116.6848,472.6752 117.4784,472.4096 118.272,472.144 119.12,472 120,472 185.33333,472 250.66667,472 316,472 381.33333,472 446.66667,472 512,472 577.33333,472 642.66667,472 708,472 773.33333,472 838.66667,472 904,472 904.88,472 905.728,472.144 906.5216,472.4096 zM904,784 C908.4,784 912,787.6 912,792 912,813.33333 912,834.66667 912,856 912,860.4 908.4,864 904,864 642.66667,864 381.33333,864 120,864 115.6,864 112,860.4 112,856 112,834.66667 112,813.33333 112,792 112,787.6 115.6,784 120,784 381.33333,784 642.66667,784 904,784 zM904,160 C908.4,160 912,163.6 912,168 912,189.33333 912,210.66667 912,232 912,236.4 908.4,240 904,240 642.66667,240 381.33333,240 120,240 115.6,240 112,236.4 112,232 112,210.66667 112,189.33333 112,168 112,163.6 115.6,160 120,160 381.33333,160 642.66667,160 904,160 z",
              "M799.855,166.312 C799.878,166.319 799.898,166.33 799.939,166.371 819.169,185.601 838.399,204.831 857.629,224.061 857.67,224.102 857.681,224.121 857.688,224.145 857.69487,224.16749 857.69487,224.19151 857.688,224.214 857.681,224.237 857.67,224.256 857.629,224.297 761.728,320.198 665.827,416.099 569.926,512 665.827,607.901 761.728,703.802 857.629,799.703 857.67,799.743 857.681,799.763 857.688,799.786 857.69508,799.8088 857.69508,799.8332 857.688,799.856 857.681,799.878 857.67,799.898 857.629,799.939 838.399,819.169 819.169,838.399 799.939,857.629 799.898,857.67 799.879,857.681 799.855,857.688 799.83251,857.69487 799.80849,857.69487 799.786,857.688 799.763,857.681 799.744,857.67 799.703,857.629 703.802,761.728 607.901,665.827 512,569.926 416.099,665.827 320.198,761.728 224.297,857.629 224.257,857.67 224.237,857.681 224.214,857.688 224.1912,857.69508 224.1668,857.69508 224.144,857.688 224.122,857.681 224.102,857.67 224.061,857.629 204.831,838.399 185.601,819.169 166.371,799.939 166.33,799.898 166.319,799.879 166.312,799.855 166.30513,799.83251 166.30513,799.80849 166.312,799.786 166.319,799.763 166.33,799.744 166.371,799.703 262.27167,703.802 358.17233,607.901 454.073,512 358.17233,416.099 262.27167,320.198 166.371,224.297 166.33,224.257 166.319,224.237 166.312,224.214 166.30492,224.1912 166.30492,224.1668 166.312,224.144 166.319,224.122 166.33,224.102 166.371,224.061 185.601,204.831 204.831,185.601 224.061,166.371 224.102,166.33 224.121,166.319 224.145,166.312 224.16749,166.30513 224.19151,166.30513 224.214,166.312 224.237,166.319 224.256,166.33 224.297,166.371 320.198,262.27167 416.099,358.17233 512,454.073 607.901,358.17233 703.802,262.27167 799.703,166.371 799.743,166.33 799.763,166.319 799.786,166.312 799.8088,166.30492 799.8332,166.30492 799.856,166.312 zM512,569.926 C512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 512,569.926 M512,454.073 C512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 512,454.073 ",
            ],
          },
          ease: "power2.inOut",
        });

        isAnimationConfigured = true;
        setMenuOpen((prev) => !prev);
      }
      return;
    }
    if (tl && morphTl) {
      if (menuOpen) {
        tl.reverse();
        morphTl.reverse();
      } else {
        tl.play();
        morphTl.play();
      }
      setMenuOpen((prev) => !prev);
    }
  };
  return (
    <LogoTransition className={className}>
      <div className="black-bg absolute top-0 h-full w-full">
        <div className="glassmorph flex h-full w-full overflow-hidden">
          <div className="left aspect-1/2 w-auto rounded-l-full"></div>
          <div className="center w-full origin-center"></div>
          <div className="right aspect-1/2 w-auto rounded-r-full"></div>
        </div>
      </div>
      <ul className="flex h-fit w-full items-center justify-between px-4">
        {urls.map((url) => (
          <li key={url.label}>
            <Link
              aria-label={url.label}
              href={url.href}
              target={url.external ? "_blank" : undefined}
              rel={url.external ? "noopener noreferrer" : undefined}
            >
              {url.icon ?? <div className="other-icons opacity-0">{url.label}</div>}
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
