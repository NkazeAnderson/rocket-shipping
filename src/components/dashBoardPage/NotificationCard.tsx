" use client";
import { dashBoardContextT, subjectT } from "@/types/types";
import React, { useContext } from "react";
import { FaBraille, FaHandDots } from "react-icons/fa6";
import { Context } from "./DashBoardWrapper";
import { BsArrowDown } from "react-icons/bs";
import { notificationT } from "@/types/schemas";

function NotificationCard({ notification }: { notification: notificationT }) {
  const { setShowSidePanel, setSidePanelContent } = useContext(
    Context
  ) as dashBoardContextT;
  return (
    <div
      className="dashboardCardBG w-full rounded-15 text-white border border-success mb-24 hover:cursor-pointer"
      onClick={() => {
        setShowSidePanel((prev) => !prev);
        setSidePanelContent({
          id: notification.appEntityId,
          subject: notification.appEntity,
        });
      }}
    >
      <div className="bg-black flex w-full rounded-t-15 py-8 px-16 border-b border-white items-center space-x-8">
        <FaBraille /> <h5 className="font-bold">{notification.heading}</h5>
      </div>
      <div className=" px-48  rounded-15 py-8">
        <p>{notification.description}</p>
      </div>
      <div>
        {notification.action && (
          <div className="flex justify-center items-center">
            <div className=" w-fit flex flex-col items-center">
              <small className=" text-center">Take action</small>
              <BsArrowDown />

              <button className=" py-8 px-24 bg-danger text-white rounded-30 my-16 animate-bounce">
                {notification.action}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationCard;
