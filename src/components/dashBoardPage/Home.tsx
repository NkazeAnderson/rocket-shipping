import React from "react";
import NotificationCard from "./NotificationCard";
import ShipmentCard from "./ShipmentCard";

function Home() {
  return (
    <>
      <h2 className="dashboardHeadings">Notifications</h2>
      <div className="py-24">
        <NotificationCard />
      </div>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-24">
        <ShipmentCard />
      </div>
    </>
  );
}

export default Home;
