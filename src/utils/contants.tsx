import { navLinkT } from "@/types/types";
import { FaHome, FaEdit } from "react-icons/fa";

export const navLinks: navLinkT[] = [
  { text: "home", icon: FaHome, path: "/" },
  { text: "Dashboard", icon: FaEdit, path: "/test" },
  { text: "Contact", icon: FaHome, path: "/" },
  { text: "FAQs", icon: FaHome, path: "/" },
];
