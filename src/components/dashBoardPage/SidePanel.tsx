"use client";
import React, { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { Context } from "./DashBoardWrapper";
import { dashBoardContextT, subjectT } from "@/types/types";
import ShipmentInfo from "./ShipmentInfo";
import Messaging from "./Messaging";

function SidePanel() {
  const { setShowSidePanel, sidePanelContent } = useContext(
    Context
  ) as dashBoardContextT;
  const subject: subjectT = "admin";
  return (
    <div
      id="sidePanel"
      className="sidePanelBg w-full h-full absolute lg:left-0 lg:static lg:w-[50%] rounded-30 lg:block rounded-r-[0] "
    >
      <div className="w-full h-full border-2 border-primary border-r-0 relative  rounded-tl-30 z-40 overflow-scroll">
        <span
          onClick={() => {
            setShowSidePanel((prev) => !prev);
          }}
          className="lg:hidden fixed top-16 right-24 p-16 rounded-full bg-danger text-white border border-success hover:border-danger hover:cursor-pointer z-40"
        >
          <FaXmark size={20} />
        </span>
        <div>
          {sidePanelContent?.subject === "shipment" && <ShipmentInfo />}
          {sidePanelContent?.subject === "conversation" && <Messaging />}
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
