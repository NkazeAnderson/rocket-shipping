"use client";
import React, { useContext } from "react";
import NotificationCard from "./NotificationCard";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function Notifications() {
  const { notifications } = useContext(AppContext) as appContextT;
  return (
    <>
      <h2 className="dashboardHeadings">Notifications</h2>
      <div className="py-24">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.$id}
            notification={notification}
          />
        ))}
      </div>
    </>
  );
}

export default Notifications;
