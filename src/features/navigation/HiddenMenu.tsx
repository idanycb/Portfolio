import { HeroLayout } from "@/components/layouts/HeroLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

const urls = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#projects",
    label: "Projects",
  },
  {
    href: "#skills",
    label: "Skills",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];

export function HiddenMenu({
  tl,
  navAnimationSet,
}: {
  tl?: GSAPTimeline;
  navAnimationSet?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const els = gsap.utils.selector(container.current)(".fade-in");
    if (navAnimationSet) {
      tl!.from(
        els,
        {
          duration: 0.3,
          xPercent: 100,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "<0.2",
      );
    }
  }, [navAnimationSet]);

  return (
    <HeroLayout ref={container}>
      <nav>
        <ul className="font-heading flex flex-col gap-2 text-right text-3xl lg:gap-4 lg:text-4xl">
          {urls.map((url) => (
            <li key={url.label} className="overflow-hidden pb-2">
              <Link
                aria-label={url.label}
                href={url.href}
                className="fade-in inline-block pl-4 transition-[font-size] duration-300 ease-in-out lg:hover:text-[1.3em]"
                onClick={() => {
                  // close the menu by reversing the timeline
                  tl?.reverse();
                }}
              >
                {url.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex h-full items-center justify-end overflow-hidden pb-20 lg:mb-0 lg:items-end">
        <p className="fade-in group origin-bottom-right -rotate-90 overflow-visible font-medium whitespace-nowrap lg:rotate-0">
          Developed & Coded by @
          <strong className="relative inline-block overflow-hidden align-middle">
            <span className="inline-block transition-transform ease-in-out group-hover:-translate-y-full group-focus:-translate-y-full group-active:-translate-y-full">
              Dany
            </span>
            <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform ease-in-out group-hover:translate-y-0 group-focus:translate-y-0 group-active:translate-y-0">
              Me!
            </span>
          </strong>
        </p>
      </div>
    </HeroLayout>
  );
}
