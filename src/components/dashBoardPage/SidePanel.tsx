"use client";
import React, { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { Context } from "./DashBoardWrapper";
import { dashBoardContextT, subjectT } from "@/types/types";

function SidePanel() {
  const { setShowSidePanel, sidePanelContent, activeTab } = useContext(
    Context
  ) as dashBoardContextT;
  const subject: subjectT = "admin";
  return (
    <div
      id="sidePanel"
      className="w-full h-full absolute lg:left-0 lg:static lg:w-[50%] rounded-30 lg:block bg-light-gray"
    >
      <div className="w-full h-full border-2 border-primary border-r-0 relative rounded-30 rounded-r-[0] z-40">
        <span
          onClick={() => {
            setShowSidePanel((prev) => !prev);
          }}
          className="lg:hidden absolute top-16 left-24 p-24 rounded-full bg-danger text-white border border-success hover:border-danger hover:cursor-pointer"
        >
          <FaXmark className=" inline " size={16} />
        </span>
        <div>
          <h2>{sidePanelContent?.subject}</h2>
          <h2>{sidePanelContent?.id}</h2>
          <h2>{sidePanelContent?.maps && "Maps"}</h2>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
