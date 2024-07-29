import React from "react";
import Logo from "./ui/Logo";
import NavLinks from "./NavLinks";
import Button from "./ui/Button";
import { FaShareSquare } from "react-icons/fa";
import NavBarMobile from "./NavBarMobile";
import Link from "next/link";
import { cookies } from "next/headers";
import LogOutButtonWrapper from "./LogOutButtonWrapper";
import { BsPersonCheck } from "react-icons/bs";
import AuthButton from "./AuthButton";

function NavBar() {
  const loggedIn =
    cookies().has("loggedIn") && cookies().get("loggedIn")?.value === "true";
  const userEmail = cookies().get("userEmail");
  return (
    <>
      <nav className="w-full px-48 py-8 bg-[#FFFFFC]/95 justify-between items-center hidden lg:flex z-50">
        <Logo />

        <NavLinks />
        <AuthButton loggedIn={loggedIn} userEmail={userEmail?.value} />
      </nav>
      {/* "mobile" */}
      <NavBarMobile loggedIn={loggedIn} userEmail={userEmail?.value} />
    </>
  );
}

export default NavBar;
