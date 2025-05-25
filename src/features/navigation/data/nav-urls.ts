import { RiCodeSSlashLine, RiFileListLine, RiFolderOpenLine, RiGithubLine } from "react-icons/ri";
import homeIcon from "../img/home-normal.png";
import { getIcon, getImageIcon } from "./nav-icon-gen";

export const urls = [
  {
    href: "/skills",
    label: "Skills",
    icon: getIcon(RiCodeSSlashLine),
  },
  {
    href: "/projects",
    label: "Projects",
    icon: getIcon(RiFolderOpenLine),
  },
  {
    href: "/",
    label: "Home",
    icon: getImageIcon(homeIcon, "home icon"),
  },
  {
    href: "/Resume_v1.pdf",
    label: "Resume",
    download: true,
    icon: getIcon(RiFileListLine, true),
  },
  {
    href: "https://github.com/dany-cb",
    label: "GitHub Profile",
    externalTarget: "_blank",
    icon: getIcon(RiGithubLine, true),
  },
];
