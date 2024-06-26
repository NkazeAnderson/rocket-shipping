import React from "react";
import ConversationCard from "./ConversationCard";
import NotificationCard from "./NotificationCard";

function Notifications() {
  return (
    <>
      <h2 className="dashboardHeadings">Notifications</h2>
      <div className="py-24">
        <NotificationCard />
      </div>
    </>
  );
}

export default Notifications;
