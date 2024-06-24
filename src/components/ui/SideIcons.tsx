"use client";
import { dashBoardContextT } from "@/types/types";
import React, { useContext } from "react";
import { IconType } from "react-icons";
import { Context } from "../dashBoardPage/DashBoardWrapper";

function SideIcon({
  icon,
  showText,
  text,
}: {
  icon: IconType;
  showText?: boolean;
  text: string;
}) {
  const context = useContext(Context);

  const Icon = icon;
  const isActive = context?.activeTab.toLowerCase() === text.toLowerCase();
  return (
    <div
      className={` p-16 md:p-24 hover:cursor-pointer flex space-x-8 ${
        isActive ? "bg-primary " : ""
      }`}
      onClick={() => {
        context?.setActiveTab(text);
      }}
    >
      <Icon size={24} />{" "}
      <p className={`${showText ? "block " : "hidden"} font-bold`}>{text}</p>
    </div>
  );
}

export default SideIcon;
