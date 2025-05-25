import cx from "classix";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { IconType } from "react-icons";

export const getIcon = (Icon: IconType, staticIcon = false) => {
  const baseStyle = `other-icons opacity-0 rounded-full w-9 h-9 p-2 bg-neutral-800 text-neutral-300`;

  if (staticIcon) {
    const StaticIcon = <Icon className={cx(baseStyle, "hover:invert")} />;
    return {
      active: StaticIcon,
      inactive: StaticIcon,
    };
  }

  return {
    active: <Icon className={cx(baseStyle, "invert")} />,
    inactive: <Icon className={cx(baseStyle, "hover:invert")} />,
  };
};

export const getImageIcon = (src: StaticImport, alt: string) => {
  const base_style = "rounded-full min-w-[36px] min-h-[36px]";
  return {
    active: (
      <Image
        width={36}
        height={36}
        src={src}
        alt={alt}
        priority
        className={cx(base_style, "home-icon ring-4 ring-neutral-100 outline-1 outline-black")}
      />
    ),
    inactive: <Image width={36} height={36} src={src} alt={alt} className={base_style} />,
  };
};
