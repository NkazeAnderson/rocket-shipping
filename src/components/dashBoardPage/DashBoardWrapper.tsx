"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import SideIcon from "../ui/SideIcons";
import { FaBell, FaComment, FaComments, FaHome } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaTruckFront } from "react-icons/fa6";
import { dashBoardContextT } from "@/types/types";
import Link from "next/link";
import Home from "./Home";
import Messages from "./Messages";
import Shipments from "./Shipments";
import Notifications from "./Notifications";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Context = createContext<null | dashBoardContextT>(null);

function DashBoardWrapper() {
  const [showText, setShowText] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [screenSize, setScreenSize] = useState(0);
  const wrapper = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    screenSize === 0 && setScreenSize(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setScreenSize(window.innerWidth);
    });
  }, [screenSize]);

  useGSAP(() => {
    gsap.fromTo(
      ".dashboardCardBG",
      { yPercent: 50 },
      { yPercent: 0, duration: 1.5 }
    );
    gsap.fromTo(
      ".dashboardHeadings",
      { xPercent: -50 },
      { xPercent: 0, duration: 1 }
    );
    setShowText(false);
  }, [activeTab]);

  return (
    <Context.Provider value={{ activeTab, setActiveTab }}>
      <div
        className="w-full h-full flex items-stretch overflow-y-hidden"
        ref={wrapper}
      >
        <div className="w-full lg:w-[50%] flex items-stretch ">
          <div className="bg-success text-white pb-32 pt-24 dashboardSideBarShadow">
            <div
              className="w-full flex justify-center py-16"
              onClick={() => {
                setShowText(!showText);
              }}
            >
              {!showText ? <FaChevronRight /> : <FaChevronLeft />}
            </div>

            <div className=" flex flex-col justify-between h-full">
              <div className="w-full">
                <SideIcon showText={showText} text="Home" icon={FaHome} />
                <SideIcon
                  showText={showText}
                  text="Shipments"
                  icon={FaTruckFront}
                />
                <SideIcon
                  showText={showText}
                  text="Messages"
                  icon={FaComments}
                />
                <SideIcon
                  showText={showText}
                  text="Notifications"
                  icon={FaBell}
                />
              </div>
              <p className=" text-center font-bold underline pb-16">
                <Link href={"/login"}> Logout</Link>
              </p>
            </div>
          </div>
          <div
            className={`flex-grow p-8 ${
              screenSize > 500 && showText ? "md:px-40" : "md:px-96"
            }  h-full overflow-y-scroll bg-primary/10`}
          >
            {activeTab.toLowerCase() === "home" && <Home />}
            {activeTab.toLowerCase() === "messages" && <Messages />}
            {activeTab.toLowerCase() === "notifications" && <Notifications />}
            {activeTab.toLowerCase() === "shipments" && <Shipments />}
          </div>
        </div>
        <div className="w-screen lg:w-[50%] hidden lg:block">
          <div className="w-full h-full border-2 border-primary border-r-0 relative rounded-30 rounded-r-[0]">
            details
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default DashBoardWrapper;
