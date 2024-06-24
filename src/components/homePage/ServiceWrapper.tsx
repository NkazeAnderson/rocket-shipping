"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import Sphere from "../ui/Sphere";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
function ServiceWrapper({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<null | HTMLDivElement>(null);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#serviceWrapper",
      scroller: "#layoutWrapper",
      onToggle: (self) => console.log("toggled, isActive:", self.isActive),

      onUpdate: ({ progress }) => {
        if (wrapper.current) {
          const width = wrapper.current.clientWidth / 2;
          const height = wrapper.current.clientHeight / 2;

          const p = progress - 0.6;
          gsap.to(".topSphere", {
            x: width - width * p,
            y: height - height * p,
            rotate: p * 180,
            scale: (1 + p) * 1.5,
          });
          gsap.to(".bottomSphere", {
            x: width + width * p,
            y: height + height * p,
            rotate: p * 180,
            scale: (1 + p) * 1.5,
          });
        }
      },
    });
  });
  return (
    <div id="serviceWrapper" className=" relative" ref={wrapper}>
      {children}
      <Sphere />
      <Sphere bottom />
    </div>
  );
}

export default ServiceWrapper;
