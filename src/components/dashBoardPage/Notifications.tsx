import React from "react";
import NotificationCard from "./NotificationCard";
import { notifications } from "@/utils/contants";

function Notifications() {
  return (
    <>
      <h2 className="dashboardHeadings">Notifications</h2>
      <div className="py-24">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} props={notification} />
        ))}
      </div>
    </>
  );
}

export default Notifications;
