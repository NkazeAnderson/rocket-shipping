"use client";
import { conversationT, dashBoardContextT, subjectT } from "@/types/types";
import Image from "next/image";
import React, { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Context } from "./DashBoardWrapper";
import Badge from "../ui/Badge";
import { BiImage } from "react-icons/bi";

function ConversationCard({ props }: { props: conversationT }) {
  const subject: subjectT = "conversation";
  const { setShowSidePanel, setSidePanelContent } = useContext(
    Context
  ) as dashBoardContextT;
  return (
    <div
      onClick={() => {
        setShowSidePanel((prev) => !prev);
        setSidePanelContent({ id: props.id, subject });
      }}
      className="dashboardCardBG md:flex justify-between items-center bg-black p-8 rounded-15 text-white hover:cursor-pointer border border-success mb-24"
    >
      <div className="flex space-x-8">
        {/* image */}
        <div className="w-fit">
          <div className="size-[50px] md:size-[60px] relative">
            <Image
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
              src={
                props.memberId2.image ? props.memberId2.image : "/no-pic.jpg"
              }
              alt=""
            />
          </div>
        </div>
        {/* text */}
        <div className="flex-grow">
          <h5 className="font-bold capitalize">{props.memberId2.name}</h5>
          <div className="flex items-center space-x-8">
            <span className="p-[4px] rounded-[100%] bg-success animate-ping"></span>
            <span>Online</span>
          </div>
          <p>
            {props.lastmessage ? (
              props.lastmessage
            ) : (
              <span className=" text-sm italic">
                <BiImage size={25} className=" inline" />
                Image
              </span>
            )}
          </p>
        </div>
      </div>
      {/* counts */}
      <div className="w-full justify-end items-center md:w-fit flex md:flex-col md:items-end">
        <div className="p-16 md:p-24  text-white flex items-center space-x-8">
          <span className=" font-thin text-[12] text-nowrap">{props.ago}</span>
          <FaCheckCircle size={10} />
        </div>
        <Badge count={props.unread} />
      </div>
    </div>
  );
}

export default ConversationCard;
