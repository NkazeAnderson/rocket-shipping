"use client";
import { appContextT} from "@/types/types";
import Image from "next/image";
import React, { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { AppContext } from "../ContextProviders/AppProvider";
import { messageT } from "@/types/schemas";

function MessageCard({ message }: { message: messageT }) {
  const { user } = useContext(AppContext) as appContextT;
  return (
    <div className={`flex w-full my-16`}>
      <div
        className={` max-w-[80%] w-fit p-16 rounded-15 ${
          message.sender === user?.$id
            ? "bg-primary/30 ml-auto"
            : "bg-primary/10 "
        }`}
      >
        {message.image ? (
          <Image
            src={message.image}
            className=" rounded-15 object-contain"
            width={300}
            height={300}
            alt="message image"
          />
        ) : (
          <span>{message.text}</span>
        )}
        <div className=" flex items-center justify-end space-x-8 text-[12px] font-bold pt-8">
          {/* <span>{`${message.day} ${message.time} `}</span> */}
          <FaCheckCircle
            className={`${message.read ? "text-success" : "text-light-gray"}`}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
