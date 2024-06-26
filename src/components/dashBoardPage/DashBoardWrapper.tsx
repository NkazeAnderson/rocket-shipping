"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import SideIcon from "../ui/SideIcons";
import {
  FaBell,
  FaComment,
  FaComments,
  FaHome,
  FaPlusCircle,
} from "react-icons/fa";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTruckFront,
  FaXmark,
} from "react-icons/fa6";
import { dashBoardContextT, sidePanelContentT } from "@/types/types";
import Link from "next/link";
import Home from "./Home";
import Messages from "./Messages";
import Shipments from "./Shipments";
import Notifications from "./Notifications";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SidePanel from "./SidePanel";

gsap.registerPlugin(useGSAP);

export const Context = createContext<null | dashBoardContextT>(null);

function DashBoardWrapper() {
  const [showText, setShowText] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidePanelContent, setSidePanelContent] =
    useState<null | sidePanelContentT>(null);
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

  useGSAP(() => {
    if (screenSize < 500 && screenSize != 0) {
      showSidePanel
        ? gsap.to("#sidePanel", { xPercent: 0, duration: 1.5 })
        : gsap.to("#sidePanel", { xPercent: 100, duration: 1.5 });
    } else {
      gsap.to("#sidePanel", { xPercent: 0, duration: 0.1 });
    }
  }, [showSidePanel, screenSize]);

  return (
    <Context.Provider
      value={{
        activeTab,
        setActiveTab,
        setShowSidePanel,
        setSidePanelContent,
        sidePanelContent,
      }}
    >
      <div
        className="w-full h-full flex flex-nowrap overflow-y-hidden overflow-x-hidden relative"
        ref={wrapper}
      >
        <div className="w-full lg:w-[50%] flex items-stretch h-full">
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
            className={` dashboardBg flex-grow p-8 ${
              screenSize > 500 && showText ? "md:px-40" : "md:px-96"
            }  h-full overflow-y-scroll bg-primary/10`}
          >
            {activeTab.toLowerCase() === "home" && <Home />}
            {activeTab.toLowerCase() === "messages" && <Messages />}
            {activeTab.toLowerCase() === "notifications" && <Notifications />}
            {activeTab.toLowerCase() === "shipments" && <Shipments />}
          </div>
        </div>
        <SidePanel />
        <span
          className={` text-primary hover:text-success hover:cursor-pointer fixed ${
            screenSize > 500 ? "bottom-16" : "top-98"
          } ${showSidePanel && "hidden"}  right-16 bg-white rounded-[100%]`}
          onClick={() => {
            setSidePanelContent({ id: "user1", subject: "admin" });
            setShowSidePanel(true);
          }}
        >
          <FaPlusCircle size={50} />
        </span>
      </div>
    </Context.Provider>
  );
}

export default DashBoardWrapper;
