"use client";
import { appContextT, dashBoardContextT, subjectT } from "@/types/types";
import Image from "next/image";
import React, { useContext, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Context } from "./DashBoardWrapper";
import Badge from "../ui/Badge";
import { BiImage } from "react-icons/bi";
import { conversationT } from "@/types/schemas";
import { AppContext } from "../ContextProviders/AppProvider";
import { format } from "timeago.js";

function ConversationCard({ conversation }: { conversation: conversationT }) {
  const subject: subjectT = "conversation";
  const { setShowSidePanel, setSidePanelContent } = useContext(
    Context
  ) as dashBoardContextT;
  const {
    userMethods: { user },
    conversationsMethods: { conversations },
  } = useContext(AppContext) as appContextT;

  const otherMember = useMemo(() => {
    if (!user || !conversation?.extras) {
      return undefined;
    }
    if (user.$id === conversation.member1) {
      return conversation.extras.member2Info;
    } else {
      return conversation.extras.member1Info;
    }
  }, [conversation]);
  const lastMessage = useMemo(() => {
    if (!conversation?.extras?.messages.length) {
      return undefined;
    }
    return conversation.extras.messages[
      conversation.extras.messages.length - 1
    ];
  }, [conversation, conversations]);

  if (!conversation.extras) {
    return null;
  }

  const unread = conversation.extras?.messages.filter(
    (value) => value.read === true
  ).length;
  return (
    <div
      onClick={() => {
        setShowSidePanel((prev) => !prev);
        setSidePanelContent({ id: conversation.$id, subject });
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
              src={otherMember?.extras?.imageUrl || "/no-pic.jpg"}
              alt=""
            />
          </div>
        </div>
        {/* text */}
        <div className="flex-grow">
          <h5 className="font-bold capitalize">
            {otherMember?.name || "Chat"}
          </h5>
          <div className="flex items-center space-x-8">
            <span className="p-[4px] rounded-[100%] bg-success animate-ping"></span>
            <span>Online</span>
          </div>
          <p>
            {lastMessage?.text ? (
              lastMessage.text
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
          <span className=" font-thin text-[12] text-nowrap">
            {lastMessage && format(lastMessage.timeStamp)}
          </span>
          <FaCheckCircle size={10} />
        </div>
        {Boolean(unread) && <Badge count={unread} />}
      </div>
    </div>
  );
}

export default ConversationCard;
