"use client";
import React, { useContext } from "react";
import Logo from "./ui/Logo";
import NavLinks from "./NavLinks";
import NavBarMobile from "./NavBarMobile";
import { cookies } from "next/headers";
import AuthButton from "./AuthButton";
import { AppContext } from "./ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function NavBar() {
  const { user } = useContext(AppContext) as appContextT;
  return (
    <>
      <nav className="w-full px-48 py-8 bg-[#FFFFFC]/95 justify-between items-center hidden lg:flex z-50">
        <Logo />

        <NavLinks />
        <AuthButton loggedIn={user !== undefined} userEmail={user?.email} />
      </nav>
      {/* "mobile" */}
      <NavBarMobile loggedIn={user !== undefined} userEmail={user?.email} />
    </>
  );
}

export default NavBar;
