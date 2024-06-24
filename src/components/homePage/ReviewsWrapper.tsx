"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

function ReviewsWrapper({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<null | HTMLDivElement>(null);
  useGSAP(() => {
    if (wrapper.current) {
      const w_sm = wrapper.current.clientWidth;
      const w_lg = wrapper.current.scrollWidth;
      gsap.to(".reviews", {
        translateX: -(w_lg - w_sm * 0.6),
        scrollTrigger: {
          trigger: ".reviewsWrapper",
          scroller: "#layoutWrapper",
        },
        duration: 12 * (w_lg / w_sm),
        repeat: -1,
        ease: "none",
      });
    }
  }, [wrapper]);
  return (
    <div className=" reviewsWrapper bg-success/20 py-32 ">
      <div ref={wrapper} className="w-full flex pl-32 space-x-16 reviews">
        {children}
      </div>
    </div>
  );
}

export default ReviewsWrapper;
