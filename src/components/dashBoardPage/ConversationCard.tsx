import Image from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function ConversationCard() {
  return (
    <div className="dashboardCardBG flex justify-between items-center bg-black p-8 rounded-15 text-white hover:cursor-pointer border border-success">
      <div className="flex space-x-8">
        <div>
          <Image
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
            className="rounded-full"
            src="/courier.png"
            alt=""
          />
        </div>
        <div>
          <h5 className="font-bold">Anthony miller</h5>
          <div className="flex items-center space-x-8">
            <span className="p-[4px] rounded-[100%] bg-success animate-ping"></span>
            <span>Online</span>
          </div>
          <p>Hello, we need your attention, right now</p>
        </div>
      </div>
      <div className="p-16 md:p-24  text-white flex items-center space-x-8">
        <span className=" font-thin text-[12] text-nowrap">6 mins</span>
        <FaCheckCircle size={10} />
      </div>
    </div>
  );
}

export default ConversationCard;
