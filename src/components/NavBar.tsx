import React, { useContext } from "react";
import Logo from "./ui/Logo";
import NavLinks from "./NavLinks";
import NavBarMobile from "./NavBarMobile";
import AuthButton from "./AuthButton";

function NavBar() {
  return (
    <>
      <nav className="w-full px-48 py-8 bg-[#FFFFFC]/95 justify-between items-center hidden lg:flex z-50">
        <Logo />

        <NavLinks />
        <AuthButton  />
      </nav>
      {/* "mobile" */}
      <NavBarMobile  />
    </>
  );
}

export default NavBar;
