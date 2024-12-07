"use client";
import React, { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { Context } from "./DashBoardWrapper";
import {
  dashBoardContextT,
} from "@/types/types";
import ShipmentInfo from "./ShipmentInfo";
import Messaging from "./Messaging";
import Admin from "./Admin";
import ShipmentMap from "./ShipmentMap";

function SidePanel() {
  const { setShowSidePanel, sidePanelContent } = useContext(
    Context
  ) as dashBoardContextT;

  return (
    <div
      id="sidePanel"
      className="sidePanelBg w-full h-full absolute lg:left-0 lg:static lg:w-[50%] rounded-tl-30 lg:block"
    >
      <div className="w-full h-full border-2 border-primary border-r-0 relative  rounded-tl-30 z-40 overflow-scroll">
        {sidePanelContent && (
          <>
            <span
              onClick={() => {
                setShowSidePanel((prev) => !prev);
              }}
              className="lg:hidden fixed top-16 right-24 p-16 rounded-full bg-danger text-white border border-success hover:border-danger hover:cursor-pointer z-40"
            >
              <FaXmark size={20} />
            </span>
            <div className="min-h-full min-w-full flex flex-col">
              {sidePanelContent?.subject === "shipment" &&
                !sidePanelContent?.maps && <ShipmentInfo />}
              {sidePanelContent?.subject === "shipment" &&
                sidePanelContent?.maps && <ShipmentMap />}
              {sidePanelContent?.subject === "conversation" && <Messaging />}
              {sidePanelContent?.subject === "admin" && <Admin />}
            </div>
          </>
        )}
        {!sidePanelContent && (
          <div className="w-full h-full flex items-center justify-center">
            <h4 className="text-center text-dark-gray italic ani">
              Select a shipment or message for more information
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidePanel;
