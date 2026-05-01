"use client";

import { FadeIn } from "@/components/animation/FadeIn";
import SelfPortrait from "@assets/images/hero/portrait-grayscale.png";
import cx from "classix";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

export const HeroPage = () => {
  return (
    <section
      id="hero-section"
      className="font-archivo md:pl-12] relative m-auto grid min-h-svh max-w-105 grid-cols-[1fr_auto] grid-rows-[repeat(4,min-content)_minmax(40px,auto)] overflow-x-hidden bg-white px-4 pt-20 pb-4 text-black md:min-h-dvh md:max-w-2xl md:pt-24 md:pr-10 md:pb-10 xl:max-w-full xl:grid-cols-12 xl:grid-rows-[repeat(7,min-content)] xl:px-20 xl:pt-28"
    >
      {/* 1. HERO TEXT */}
      <FadeIn from="top" className="col-span-2 mt-5 block h-fit xl:row-start-4 xl:self-end">
        <span className="block text-[24px] leading-none font-extrabold tracking-[-1.2px] text-[#4a4848] sm:text-[26px]">
          CALL ME
        </span>
      </FadeIn>
      <FadeIn lcp delay={0.1} className="col-span-2 md:col-span-1 xl:col-span-4 xl:row-start-5">
        <h1 className="mb-6 -ml-2 text-[clamp(6.5rem,35cqw,9.3rem)] leading-[0.8] font-extrabold -tracking-widest text-balance md:-ml-3 md:text-[clamp(10rem,40cqw,12rem)] xl:text-[clamp(9rem,11.4vw,14rem)]">
          DANY.
        </h1>
      </FadeIn>

      {/* Mobile: col 2, row 2 | Tablet: col 2, row 1 */}
      <div
        className="relative col-start-2 row-span-2 row-start-3 pb-4 md:row-span-3 md:row-start-2 md:pb-6 xl:col-start-11 xl:row-span-4 xl:row-start-2 xl:mb-16 xl:py-2 xl:pl-2"
        aria-hidden="true"
      >
        <FadeIn
          from="top"
          delay={0.2}
          className="absolute top-0 bottom-2 -left-2 hidden h-auto! w-1 xl:block"
        >
          <span className="block h-full w-full bg-black" />
        </FadeIn>
        <div className="flex h-full flex-col justify-between">
          {[
            { line1: "SOFTWARE", line2: "ENGINEER" },
            { line1: "WEB", line2: "DEVELOPER" },
            { line1: "DEVOPS", line2: "ENGINEER", class: "text-end xl:text-start" },
          ].map((role, i) => (
            <div
              key={i}
              className="writing-vertical-rl xl:writing-normal relative flex items-center whitespace-nowrap md:pb-4 md:pl-1"
            >
              <FadeIn
                from="top"
                delay={0.2 + i * 0.1}
                className="absolute inset-y-0 left-0 hidden h-auto! w-0.5 md:block xl:hidden"
              >
                <span className="block h-full w-full bg-black" />
              </FadeIn>
              <FadeIn from="right" delay={0.2 + i * 0.1} clip={false}>
                <div
                  className={cx(
                    "text-[clamp(14px,3.5vw,18px)] leading-[0.9] font-extrabold tracking-[-0.8px] uppercase md:text-[22px] md:leading-5",
                    role?.class,
                  )}
                >
                  {role.line1} <br /> {role.line2}
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-10 z-5 col-start-6 hidden h-[78dvh] xl:flex">
        <FadeIn from="bottom" delay={0.3} className="w-fit">
          <div className="h-[78dvh] w-fit">
            <Image
              src={SelfPortrait}
              alt="Portrait of Daniel Thomas"
              quality={90}
              className="h-full w-auto object-cover grayscale"
              priority
              sizes="(max-width: 1280px) 0vw, 44vw"
            />
          </div>
        </FadeIn>
      </div>
      <FadeIn
        from="left"
        delay={0.2}
        className="col-span-2 col-start-7 row-span-2 row-start-1 mb-6 ml-5 hidden max-w-40 xl:block"
      >
        <p className="text-[12px] leading-none font-bold">
          I&apos;m just a person curious about tech and passionate about learning something new
          everyday.
        </p>
      </FadeIn>
      <FadeIn
        from="left"
        delay={0.3}
        className="col-span-2 col-start-5 row-span-1 row-start-3 ml-5 hidden max-w-40 xl:block"
      >
        <p className="text-[12px] leading-none font-bold">
          When I&apos;m not coding, I&apos;m either making art or striking up a tune on my ukulele.
        </p>
      </FadeIn>
      <FadeIn
        from="left"
        delay={0.4}
        className="absolute top-0 left-0 col-start-5 row-start-6 hidden h-[40dvh] w-screen bg-[#ababab] xl:block"
      >
        <a
          href="#about"
          className="absolute bottom-0 left-0 inline-block h-14 w-20 bg-black p-2 text-amber-50"
          aria-label="Scroll Down"
        >
          <FiChevronDown
            strokeWidth={1}
            size="100%"
            preserveAspectRatio="none"
            aria-hidden="true"
          />
        </a>
      </FadeIn>

      {/* 3. MAIN CONTENT (About Card & CTA) */}
      <FadeIn
        delay={0.3}
        className="col-start-1 row-start-3 flex w-full flex-col items-center gap-6 px-5 md:col-span-1 md:mt-10 xl:hidden"
      >
        <div className="flex aspect-[1/1.3] h-fit w-full max-w-60 flex-col items-center rounded-[10px] border-2 border-[#a9a9a9] bg-[#e3e3e3] px-2.5 py-3.25 shadow-[0px_9px_25.1px_-1px_rgba(0,0,0,0.2)] md:w-88 md:max-w-none md:px-3 md:py-4">
          <div className="relative flex aspect-[1/1.1] w-full items-end justify-center overflow-hidden rounded-[10px] bg-[#a3a3a3] pt-5">
            <Image
              src={SelfPortrait}
              alt="Portrait of Daniel Thomas"
              className="h-full w-auto object-cover grayscale"
              sizes="(max-width: 768px) 165px, 317px"
              priority
            />
          </div>
          <div className="mt-3.25 flex h-fit items-start gap-4 md:mt-4 md:gap-5">
            <h2 className="text-[24px] leading-none font-extrabold tracking-[-1.2px] md:text-[clamp(2rem,3vw,2.4rem)]">
              Me?
            </h2>
            <p className="text-[12px] leading-none font-bold md:text-[clamp(0.8rem,1vw,0.95rem)] md:leading-[1.08]">
              I&apos;m just a person curious about tech and passionate about learning something new
              everyday. When I&apos;m not coding, I&apos;m either making art or striking up a tune
              on my ukulele.
            </p>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-5 left-1/2 h-10 w-20 -translate-x-1/2"
          aria-label="Scroll Down"
        >
          <FiChevronDown
            strokeWidth={1}
            size="100%"
            preserveAspectRatio="none"
            aria-hidden="true"
          />
        </a>
      </FadeIn>
      {/* CTA Button */}
      <FadeIn
        delay={0.4}
        className="my-4 h-fit w-fit place-self-center md:my-6 xl:col-end-4 xl:row-start-6 xl:my-0 xl:self-start"
      >
        <a
          href="#contact"
          className="inline-flex h-fit w-fit items-center justify-between rounded-[15px] bg-black px-5.5 py-1 text-white shadow-lg transition-colors hover:bg-[#4a4848] focus-visible:ring-2 focus-visible:ring-black md:rounded-[20px] md:px-10 md:py-2 xl:py-1"
        >
          <span className="mr-2 text-[clamp(16px,4vw,19px)] font-bold tracking-[-0.95px] whitespace-pre uppercase">
            LET&apos;S CONNECT
          </span>
          <BsArrowUpRight className="text-[18px]" strokeWidth={0.7} aria-hidden="true" />
        </a>
      </FadeIn>
    </section>
  );
};
