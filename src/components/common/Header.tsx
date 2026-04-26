"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin, useGSAP);
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { contextSafe } = useGSAP();

  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const bottomButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const line3Ref = useRef<SVGPathElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const headerHeightRef = useRef(0);
  const latestScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const areControlsHiddenRef = useRef(false);
  const isOpenRef = useRef(false);
  const isFixedRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      document.documentElement.style.overflow = originalHtmlOverflow;
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

  useGSAP(() => {
    const brand = brandRef.current;
    const bottomButton = bottomButtonRef.current;
    const mobileButton = mobileButtonRef.current;
    if (!brand || !bottomButton || !mobileButton) return;

    const setControlsHidden = (hidden: boolean, immediate = false) => {
      if (areControlsHiddenRef.current === hidden) return;
      areControlsHiddenRef.current = hidden;

      if (immediate) {
        gsap.set(brand, { y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 });
        gsap.set(bottomButton, { y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 });
        gsap.set(mobileButton, { y: hidden ? -24 : 0, opacity: hidden ? 0 : 1 });
        return;
      }

      const tweenOptions = {
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto" as const,
      };
      gsap.to(brand, { y: hidden ? -100 : 0, opacity: hidden ? 0 : 1, ...tweenOptions });
      gsap.to(bottomButton, { y: hidden ? -80 : 0, opacity: hidden ? 0 : 1, ...tweenOptions });
      gsap.to(mobileButton, { y: hidden ? -24 : 0, opacity: hidden ? 0 : 1, ...tweenOptions });
    };

    const showControls = (immediate = false) => {
      setControlsHidden(false, immediate);
    };

    const hideControls = (immediate = false) => {
      setControlsHidden(true, immediate);
    };

    const updateHeaderHeight = () => {
      headerHeightRef.current = headerRef.current?.offsetHeight ?? 0;
    };

    const flushScrollState = () => {
      rafIdRef.current = null;
      if (isOpenRef.current) return;

      const currentScrollY = latestScrollYRef.current;
      const previousScrollY = lastScrollYRef.current;
      const shouldBeFixed = currentScrollY > headerHeightRef.current;
      const isScrollingDown = currentScrollY > previousScrollY + 2;
      const isScrollingUp = currentScrollY < previousScrollY - 2;
      const wasFixed = isFixedRef.current;

      if (shouldBeFixed !== wasFixed) {
        isFixedRef.current = shouldBeFixed;
        setIsFixed(shouldBeFixed);
      }

      if (!shouldBeFixed) {
        showControls();
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (!wasFixed && shouldBeFixed && isScrollingDown) {
        hideControls(true);
      } else if (isScrollingUp) {
        showControls();
      } else if (isScrollingDown) {
        hideControls();
      }

      lastScrollYRef.current = currentScrollY;
    };

    const scheduleFrame = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(flushScrollState);
    };

    const onScroll = () => {
      latestScrollYRef.current = window.scrollY;
      scheduleFrame();
    };

    const onResize = () => {
      updateHeaderHeight();
      latestScrollYRef.current = window.scrollY;
      scheduleFrame();
    };

    gsap.set([brand, bottomButton, mobileButton], { y: 0, opacity: 1 });
    updateHeaderHeight();
    latestScrollYRef.current = window.scrollY;
    lastScrollYRef.current = latestScrollYRef.current;

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && headerRef.current
        ? new ResizeObserver(() => {
            updateHeaderHeight();
            latestScrollYRef.current = window.scrollY;
            scheduleFrame();
          })
        : null;
    if (resizeObserver && headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    scheduleFrame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  const toggleMenu = useCallback(() => {
    contextSafe(() => {
      gsap.killTweensOf(
        [
          brandRef.current,
          bottomButtonRef.current,
          mobileButtonRef.current,
          line1Ref.current,
          line2Ref.current,
          line3Ref.current,
          modalRef.current,
        ].filter(Boolean),
      );

      const nextIsOpen = !isOpen;
      isOpenRef.current = nextIsOpen;
      setIsOpen(nextIsOpen);

      if (nextIsOpen) {
        areControlsHiddenRef.current = false;

        // Morph to Close
        gsap.to(line1Ref.current, {
          morphSVG: "M 6 6 L 18 18",
          duration: 0.4,
          ease: "power2.inOut",
        });
        gsap.to(line2Ref.current, { opacity: 0, duration: 0.2, ease: "power2.inOut" });
        gsap.to(line3Ref.current, {
          morphSVG: "M 6 18 L 18 6",
          duration: 0.4,
          ease: "power2.inOut",
        });

        // Show modal
        if (modalRef.current) {
          gsap.fromTo(
            modalRef.current,
            { opacity: 0, y: -20, display: "none" },
            { opacity: 1, y: 0, display: "flex", duration: 0.4, ease: "power2.out" },
          );
        }
      } else {
        areControlsHiddenRef.current = false;

        // Morph to Hamburger
        gsap.to(line1Ref.current, {
          morphSVG: "M 4 6 L 20 6",
          duration: 0.4,
          ease: "power2.inOut",
        });
        gsap.to(line2Ref.current, { opacity: 1, duration: 0.4, ease: "power2.inOut" });
        gsap.to(line3Ref.current, {
          morphSVG: "M 4 18 L 20 18",
          duration: 0.4,
          ease: "power2.inOut",
        });

        // Hide modal
        if (modalRef.current) {
          gsap.to(modalRef.current, {
            opacity: 0,
            y: -20,
            display: "none",
            duration: 0.3,
            ease: "power2.in",
          });
        }
      }
    })();
  }, [contextSafe, isOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`pointer-events-none z-50 flex w-full flex-col justify-between p-3 pb-6 md:p-6 lg:px-10 ${
          isFixed ? "fixed top-0 h-dvh" : "relative col-start-1 row-start-1 h-full"
        }`}
      >
        <div
          ref={brandRef}
          className="z-50 flex items-center justify-between rounded-lg will-change-[transform,opacity] select-none"
        >
          <div className="flex w-full items-center justify-between">
            <Link href="/" aria-label="Home" className="pointer-events-auto rounded-full">
              <div className="glassmorph flex items-center justify-center rounded-full border-3 border-black px-4 py-2 transition-colors hover:bg-black hover:text-white">
                <span className="text-[clamp(1rem,5vw,1.4rem)] leading-[0.95] font-semibold tracking-tight uppercase">
                  Daniel Thomas
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav
              aria-label="Main Navigation"
              className={`${isFixed ? "glassmorph" : ""} pointer-events-auto hidden items-center gap-22 rounded-full p-3 pr-8 pl-16 xl:flex`}
            >
              <Link
                href="#about"
                className="font-archivo text-[16px] font-black tracking-[-0.8px] text-black transition-opacity hover:opacity-70"
              >
                ABOUT
              </Link>
              <Link
                href="#projects"
                className="font-archivo text-[16px] font-black tracking-[-0.8px] text-black transition-opacity hover:opacity-70"
              >
                PROJECTS
              </Link>
              <Link
                href="#skills"
                className="font-archivo text-[16px] font-black tracking-[-0.8px] text-black transition-opacity hover:opacity-70"
              >
                SKILLS
              </Link>
            </nav>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={mobileButtonRef}
            onClick={toggleMenu}
            className={`${isFixed && !isOpen ? "glassmorph" : ""} pointer-events-auto rounded-full p-2 will-change-[transform,opacity] focus-visible:ring-2 focus-visible:ring-black xl:hidden`}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path ref={line1Ref} d="M 4 6 L 20 6" />
              <path ref={line2Ref} d="M 4 12 L 20 12" />
              <path ref={line3Ref} d="M 4 18 L 20 18" />
            </svg>
          </button>
        </div>

        {/* Socials Button */}
        <button
          ref={bottomButtonRef}
          className="glassmorph pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-black p-2 will-change-[transform,opacity] focus-visible:ring-2 focus-visible:ring-black"
          aria-label="Socials"
        >
          <FiMoreHorizontal className="text-xl" />
        </button>
      </header>

      {/* Mobile Modal Menu */}
      <div
        ref={modalRef}
        id="mobile-menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            toggleMenu();
          }
        }}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center bg-white/95 backdrop-blur-sm xl:hidden"
      >
        <nav className="flex flex-col items-center gap-8">
          <Link
            href="#about"
            onClick={toggleMenu}
            className="font-archivo text-[32px] font-black tracking-[-1.6px] text-black transition-opacity hover:opacity-70"
          >
            ABOUT
          </Link>
          <Link
            href="#projects"
            onClick={toggleMenu}
            className="font-archivo text-[32px] font-black tracking-[-1.6px] text-black transition-opacity hover:opacity-70"
          >
            PROJECTS
          </Link>
          <Link
            href="#skills"
            onClick={toggleMenu}
            className="font-archivo text-[32px] font-black tracking-[-1.6px] text-black transition-opacity hover:opacity-70"
          >
            SKILLS
          </Link>
        </nav>
      </div>
    </>
  );
}
