import React from "react";
import NotificationCard from "./NotificationCard";
import ShipmentCard from "./ShipmentCard";

function Home() {
  return (
    <>
      <h2 className="dashboardHeadings">Notifications</h2>
      <div className="py-24">
        <NotificationCard props={{ id: "Nt-17372636" }} />
      </div>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-24">
        <ShipmentCard props={{ id: "Rs-097899" }} />
      </div>
    </>
  );
}

export default Home;
