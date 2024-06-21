import React from "react";
import NavLink from "./ui/NavLink";
import { navLinks } from "@/utils/contants";

function NavLinks() {
  return (
    <div className="lg:flex lg:space-x-24 space-y-16 lg:space-y-[0px]">
      {navLinks.map((item) => (
        <NavLink key={item.text} props={item} />
      ))}
    </div>
  );
}

export default NavLinks;
