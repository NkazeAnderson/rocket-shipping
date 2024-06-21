"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
function HeroWrapper({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    gsap.fromTo(
      ".bgImg",
      { left: window.innerWidth },
      {
        left: 0,
        stagger: 10,
        repeat: -1,
        duration: 6,
        repeatDelay: 2,
      }
    );
    gsap.fromTo(
      ".foreImg",
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 10,
        repeat: -1,
        duration: 6,
        repeatDelay: 2,
      }
    );
  });
  return <>{children}</>;
}

export default HeroWrapper;
