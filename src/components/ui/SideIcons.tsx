"use client";
import { activeTabT, dashBoardContextT } from "@/types/types";
import React, { useContext } from "react";
import { IconType } from "react-icons";
import { Context } from "../dashBoardPage/DashBoardWrapper";
import Badge from "./Badge";

function SideIcon({
  icon,
  showText,
  text,
  count,
}: {
  icon: IconType;
  showText?: boolean;
  count?: number;
  text: activeTabT;
}) {
  const context = useContext(Context);

  const Icon = icon;
  const isActive = context?.activeTab.toLowerCase() === text.toLowerCase();
  return (
    <div
      className={` relative p-16 md:p-24 hover:cursor-pointer flex space-x-8 ${
        isActive ? "bg-primary " : ""
      }`}
      onClick={() => {
        context?.setActiveTab(text);
      }}
    >
      <Icon size={24} />{" "}
      <p className={`${showText ? "block " : "hidden"} font-bold capitalize`}>
        {text}
      </p>
      {count && (
        <span className="absolute top-8 right-8">
          <Badge count={10} />
        </span>
      )}
    </div>
  );
}

export default SideIcon;
