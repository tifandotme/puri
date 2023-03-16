import { IconType } from "react-icons";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";
import {
  HiHome,
  HiInbox,
  HiOutlineHome,
  HiOutlineInbox,
  HiOutlineUserGroup,
  HiUserGroup,
} from "react-icons/hi2";

type NavLink = {
  name: string;
  path: string;
  icon: IconType;
  iconActive: IconType;
}[];

const navLinks: NavLink = [
  {
    name: "Beranda",
    path: "/",
    icon: HiOutlineHome,
    iconActive: HiHome,
  },
  {
    name: "Pelanggan",
    path: "/customers",
    icon: HiOutlineUserGroup,
    iconActive: HiUserGroup,
  },
  {
    name: "Pesanan",
    path: "/orders",
    icon: HiOutlineInbox,
    iconActive: HiInbox,
  },
  {
    name: "Bantuan",
    path: "/help",
    icon: BsQuestionCircle,
    iconActive: BsQuestionCircleFill,
  },
];

export default navLinks;
