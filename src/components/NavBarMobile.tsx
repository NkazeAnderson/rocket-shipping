"use client";
import React, { useEffect, useState } from "react";
import { FaShareSquare } from "react-icons/fa";
import { FaBars, FaDeleteLeft } from "react-icons/fa6";
import Logo from "./ui/Logo";
import NavLinks from "./NavLinks";
import Button from "./ui/Button";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

function NavBarMobile() {
  const [opened, setOpened] = useState(false);
  const path = usePathname();
  useEffect(() => {
    opened && setOpened(false);
  }, [path]);
  useGSAP(() => {
    if (opened) {
      gsap.fromTo(
        ".links",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      );
      gsap.fromTo(".logo", { x: -50 }, { x: 0, duration: 0.5 });
      gsap.to(".navMobile", { height: "100svh", duration: 1 });
    } else {
      gsap.to(".navMobile", { height: "10svh", duration: 1 });
    }
  }, [opened]);
  return (
    <nav
      className={`navMobile w-full px-48 py-8 bg-[#FFFFFC]/90 flex ${
        opened ? "flex-col items-center" : " flex-row-reverse items-start"
      } justify-between lg:hidden z-50`}
    >
      <div className="flex justify-end w-full">
        <div
          onClick={(e) => {
            setOpened(!opened);
          }}
        >
          {opened ? (
            <FaDeleteLeft size={50} className="text-danger" />
          ) : (
            <FaBars size={50} className="text-success" />
          )}
        </div>
      </div>
      <div className="logo">
        <Logo />
      </div>
      <div
        className={`links ${
          opened ? "flex" : "hidden"
        } w-full h-full  flex-col items-center justify-between pt-24`}
      >
        <NavLinks />
        <Link href="/auth/login">
          <Button props={{ text: "Login", icon: FaShareSquare }} />
        </Link>
      </div>
    </nav>
  );
}

export default NavBarMobile;
