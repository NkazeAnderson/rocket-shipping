import React from "react";
import Logo from "./ui/Logo";
import NavLinks from "./NavLinks";
import Button from "./ui/Button";
import { FaShareSquare } from "react-icons/fa";
import NavBarMobile from "./NavBarMobile";
import Link from "next/link";

function NavBar() {
  return (
    <>
      <nav className="w-full px-48 py-8 bg-[#FFFFFC]/95 justify-between items-center hidden lg:flex z-50">
        <Logo />

        <NavLinks />
        <Link href={"/auth/login"}>
          <Button props={{ text: "Login", icon: FaShareSquare }} />
        </Link>
      </nav>
      {/* "mobile" */}
      <NavBarMobile />
    </>
  );
}

export default NavBar;
