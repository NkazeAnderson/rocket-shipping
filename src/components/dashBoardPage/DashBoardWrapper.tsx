"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SideIcon from "../ui/SideIcons";
import {
  FaBell,
  FaComment,
  FaComments,
  FaHome,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTruckFront,
  FaXmark,
} from "react-icons/fa6";
import {
  activeTabT,
  appContextT,
  dashBoardContextT,
  sidePanelContentT,
} from "@/types/types";
import Link from "next/link";
import Home from "./Home";
import Shipments from "./Shipments";
import Notifications from "./Notifications";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SidePanel from "./SidePanel";
import Conversations from "./Conversations";
import { getCookie } from "@/utils/frontendCookies";
import { useRouter } from "next/navigation";
import { AppContext } from "../ContextProviders/AppProvider";

gsap.registerPlugin(useGSAP);

export const Context = createContext<null | dashBoardContextT>(null);

function DashBoardWrapper() {
  const [showText, setShowText] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidePanelContent, setSidePanelContent] =
    useState<null | sidePanelContentT>(null);
  const [activeTab, setActiveTab] = useState<activeTabT>("home");
  const [screenSize, setScreenSize] = useState(0);
  const router = useRouter();
  const wrapper = useRef<null | HTMLDivElement>(null);
  const {
    userMethods: { user },
    conversationsMethods: { conversations },
    shipmentsMethods: { shipments },
  } = useContext(AppContext) as appContextT;
  !user && router.push("/auth/login");
  useEffect(() => {
    screenSize === 0 && setScreenSize(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setScreenSize(window.innerWidth);
    });
    setShowSidePanel(false);
  }, [screenSize]);

  useEffect(() => {
    shipments.length &&
      (() => {
        setShowSidePanel(true);
        setSidePanelContent({
          id: shipments[0].$id,
          subject: "shipment",
        });
      })();
  }, [shipments]);

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
        ? gsap.to("#sidePanel", { xPercent: 0, duration: 1 })
        : gsap.to("#sidePanel", { xPercent: 100, duration: 1 });
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
        {user ? (
          <>
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
                    <SideIcon showText={showText} text="home" icon={FaHome} />
                    <SideIcon
                      showText={showText}
                      text="shipments"
                      icon={FaTruckFront}
                    />

                    <SideIcon
                      showText={showText}
                      text="notifications"
                      icon={FaBell}
                    />
                    {user?.isAdmin && (
                      <div className="w-full flex justify-center mt-32">
                        <span
                          className={` text-white mx-auto hover:cursor-pointer  right-16 rounded-[100%]`}
                          onClick={() => {
                            setSidePanelContent({
                              id: "user1",
                              subject: "admin",
                            });
                            setShowSidePanel(true);
                          }}
                        >
                          <FaPlusCircle size={30} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={` dashboardBg flex-grow p-8 ${
                  screenSize > 500 && showText ? "md:px-40" : "md:px-96"
                }  h-full overflow-y-scroll bg-primary/10`}
              >
                {activeTab.toLowerCase() === "home" && <Home />}
                {activeTab.toLowerCase() === "conversations" && (
                  <Conversations />
                )}
                {activeTab.toLowerCase() === "notifications" && (
                  <Notifications />
                )}
                {activeTab.toLowerCase() === "shipments" && <Shipments />}
              </div>
            </div>
            <SidePanel />
          </>
        ) : (
          <div className="w-full h-full bg-success"></div>
        )}
      </div>
    </Context.Provider>
  );
}

export default DashBoardWrapper;
