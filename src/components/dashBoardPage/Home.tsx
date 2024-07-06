import React from "react";
import NotificationCard from "./NotificationCard";
import ShipmentCard from "./ShipmentCard";
import ViewMore from "./ViewMore";
import { notifications, shipments } from "@/utils/contants";

function Home() {
  return (
    <>
      <h2 className="dashboardHeadings">Notifications</h2>
      <div className="py-16">
        <NotificationCard props={notifications[0]} />
        <ViewMore value="notifications" />
      </div>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-16">
        <ShipmentCard props={shipments[0]} />
        <ViewMore value="shipments" />
      </div>
    </>
  );
}

export default Home;
