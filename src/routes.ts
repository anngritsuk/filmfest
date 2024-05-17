import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { PiChatCircleBold } from "react-icons/pi";
import { IoPricetagsOutline } from "react-icons/io5";

export const routes = [
  {
    title: "Home",
    href: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "Trends",
    href: "/trends",
    Icon: FiSearch,
  },
  {
    title: "Favourites",
    href: "/favourites",
    Icon: IoPricetagsOutline,
  },
  {
    title: "Settings",
    href: "/settings",
    Icon: PiChatCircleBold,
  },
];
