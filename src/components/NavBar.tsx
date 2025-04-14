"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiCodeSSlashLine, RiFileListLine, RiFolderOpenLine, RiGithubLine } from "react-icons/ri";

// Define a type for the styling object
type IconStyling = {
  ACTIVE: string;
  INACTIVE: string;
};

const DEFAULT_ICON_STYLING: IconStyling = {
  ACTIVE: "rounded-full w-9 h-9 p-2 bg-neutral-300 text-neutral-800",
  INACTIVE: "rounded-full w-9 h-9 p-2 bg-neutral-800 text-neutral-300 hover:invert",
};

const urls = [
  {
    href: "/skills",
    label: "Skills",
    icon: {
      active: <RiCodeSSlashLine className={DEFAULT_ICON_STYLING.ACTIVE} />,
      inactive: <RiCodeSSlashLine className={DEFAULT_ICON_STYLING.INACTIVE} />,
    },
  },
  {
    href: "/projects",
    label: "Projects",
    icon: {
      active: <RiFolderOpenLine className={DEFAULT_ICON_STYLING.ACTIVE} />,
      inactive: <RiFolderOpenLine className={DEFAULT_ICON_STYLING.INACTIVE} />,
    },
  },
  {
    href: "/",
    label: "Home",
    icon: {
      active: (
        <Image
          width={36}
          height={36}
          src="/icons/nav/home-normal.png"
          alt="home icon"
          className="rounded-full ring-4 ring-neutral-100 outline-1 outline-black"
        />
      ),
      inactive: (
        <Image
          width={36}
          height={36}
          src="/icons/nav/home-normal.png"
          alt="home icon"
          className="rounded-full"
        />
      ),
    },
  },
  {
    href: "/resume",
    label: "Resume",
    icon: {
      active: <RiFileListLine className={DEFAULT_ICON_STYLING.ACTIVE} />,
      inactive: <RiFileListLine className={DEFAULT_ICON_STYLING.INACTIVE} />,
    },
  },
  {
    href: "/github",
    label: "GitHub Profile",
    icon: {
      active: <RiGithubLine className={DEFAULT_ICON_STYLING.INACTIVE} />,
      inactive: <RiGithubLine className={DEFAULT_ICON_STYLING.INACTIVE} />,
    },
  },
];

type NavBarProps = {
  className?: string;
};
export function NavBar({ className }: NavBarProps) {
  const pathname = usePathname();

  return (
    <nav className={"z-10 flex justify-center overflow-visible " + className}>
      <ul className="flex h-fit justify-between gap-4 rounded-4xl bg-black px-5 py-2">
        {urls.map((url) => (
          <li key={url.href}>
            <Link href={url.href}>
              {pathname === url.href ? url.icon.active : url.icon.inactive}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
