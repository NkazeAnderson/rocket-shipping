import { messageT } from "@/types/types";
import Image from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function MessageCard({ props }: { props: messageT }) {
  return (
    <div className={`flex w-full my-16`}>
      <div
        className={` max-w-[80%] w-fit p-16 rounded-15 ${
          props.isSender ? "bg-primary/30 ml-auto" : "bg-primary/10 "
        }`}
      >
        {props.image ? (
          <Image
            src={props.image}
            className=" rounded-15 object-contain"
            width={300}
            height={300}
            alt="message image"
          />
        ) : (
          <span>{props.text}</span>
        )}
        <div className=" flex items-center justify-end space-x-8 text-[12px] font-bold pt-8">
          <span>{`${props.day} ${props.time} `}</span>
          <FaCheckCircle
            className={`${props.read ? "text-success" : "text-light-gray"}`}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
