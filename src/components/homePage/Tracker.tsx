import React from "react";
import Button from "../ui/Button";
import { FaShareFromSquare } from "react-icons/fa6";
import Image from "next/image";

function Tracker() {
  return (
    <div className="md:flex p-16 md:p-48 space-y-48 md:space-y-0">
      <div className="md:w-[50%]">
        <div className="lg:w-[50%] mx-auto space-y-16">
          <h2 className="font-bold">
            Keep track of your shipments all in one location
          </h2>
          <p>
            Log into your account to track and manage your shipments with ease
          </p>
          <div className=" relative">
            <div className="absolute size-16 rounded-15 bg-success z-10 left-8 top-8 animate-bounce"></div>
            <Button
              props={{
                text: "Log in to your account",
                icon: FaShareFromSquare,
              }}
            />
          </div>
        </div>
      </div>
      <div className=" md:w-[50%] flex flex-col items-center justify-center duration-1000">
        <Image width={250} height={250} src={"/worldMap.png"} alt="World Map" />
      </div>
    </div>
  );
}

export default Tracker;
