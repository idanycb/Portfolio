"use client";

import { LogoTransition } from "@/components/animation/LogoTransition";
import cx from "classix";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { urls } from "./data/nav-urls";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className={cx("z-10 flex justify-center overflow-visible", "sticky top-8 -mt-24 mb-24 h-0")}
    >
      <LogoTransition className="relative h-fit">
        <div className="black-bg absolute h-full w-fit opacity-0">
          <div className="flex h-full">
            <div className="left w-[30px] rounded-l-full bg-black"></div>
            <div className="center w-[260px] origin-center bg-black"></div>
            <div className="right w-[30px] rounded-r-full bg-black"></div>
          </div>
        </div>
        <ul
          className={cx("list flex h-full justify-between gap-5 px-[30px] py-3", "list opacity-0")}
        >
          {urls.map((url) => (
            <li key={url.href}>
              <Link
                aria-label={url.label}
                href={url.href}
                download={url.download}
                target={url.externalTarget}
              >
                {pathname === url.href ? url.icon.active : url.icon.inactive}
              </Link>
            </li>
          ))}
        </ul>
      </LogoTransition>
    </nav>
  );
}
