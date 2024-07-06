"use client";
import React, { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Context } from "./DashBoardWrapper";
import { activeTabT, dashBoardContextT } from "@/types/types";

function ViewMore({ value }: { value: activeTabT }) {
  const { setActiveTab } = useContext(Context) as dashBoardContextT;
  return (
    <h5
      onClick={() => {
        setActiveTab(value);
      }}
      className="text-end text-success font-bold underline hover:cursor-pointer"
    >
      View more
      <BsArrowRight size={20} className=" inline" />
    </h5>
  );
}

export default ViewMore;
