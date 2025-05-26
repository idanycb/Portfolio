import { TextFadeIn } from "@/components/animation";
import { FadeIn } from "@/components/animation/FadeIn";
import cx from "classix";
import Image from "next/image";
import Link from "next/link";
import HeroLogo from "./img/HeroLogo.svg";

const urls = [
  {
    href: "#",
    label: "About",
  },
  {
    href: "#",
    label: "Projects",
  },
  {
    href: "#",
    label: "Skills",
  },
  {
    href: "#",
    label: "Contact",
  },
];

export function HiddenMenu({ className }: { className?: string }) {
  return (
    <div className={cx(className, "flex pt-10")}>
      <div className="flex w-1/2 flex-col">
        <FadeIn delay={0.5} duration={1.5}>
          <Image src={HeroLogo} alt="logo" priority />
        </FadeIn>
        <div className="flex grow items-center">
          <TextFadeIn
            delay={0.5}
            className="relative left-4 font-serif text-xs leading-tight font-extrabold"
          >
            Passionate Designer & Full Stack Developer
          </TextFadeIn>
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        <nav className="">
          <ul className="font-heading flex flex-col gap-2 text-right text-3xl">
            {urls.map((url) => (
              <TextFadeIn singleLine delay={1} as="li" key={url.label}>
                <Link aria-label={url.label} href={url.href}>
                  {url.label}
                </Link>
              </TextFadeIn>
            ))}
          </ul>
        </nav>
        <div className="mb-20 flex h-full items-center justify-end">
          <TextFadeIn
            singleLine
            delay={0.5}
            className="group origin-right -rotate-90 overflow-visible font-medium whitespace-nowrap"
          >
            Developed & Coded by @
            <strong className="relative inline-block overflow-hidden align-middle">
              <span className="inline-block transition-transform ease-in-out group-hover:-translate-y-full group-focus:-translate-y-full group-active:-translate-y-full">
                Dany
              </span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform ease-in-out group-hover:translate-y-0 group-focus:translate-y-0 group-active:translate-y-0">
                Me!
              </span>
            </strong>
          </TextFadeIn>
        </div>
      </div>
    </div>
  );
}
