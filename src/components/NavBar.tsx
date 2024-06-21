import React from "react";
import Logo from "./ui/Logo";
import NavLinks from "./NavLinks";
import Button from "./ui/Button";
import { FaCross, FaShareSquare } from "react-icons/fa";
import NavBarMobile from "./NavBarMobile";

function NavBar() {
  return (
    <>
      <nav className="w-full px-48 py-24 bg-[#FFFFFC]/70 justify-between items-center hidden lg:flex">
        <Logo />

        <NavLinks />
        <Button props={{ text: "Login", icon: FaShareSquare }} />
      </nav>
      {/* "mobile" */}
      <NavBarMobile />
    </>
  );
}

export default NavBar;
