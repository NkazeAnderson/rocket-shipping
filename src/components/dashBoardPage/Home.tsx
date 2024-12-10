import React, { useContext } from "react";
import NotificationCard from "./NotificationCard";
import ShipmentCard from "./ShipmentCard";
import ViewMore from "./ViewMore";
import { notifications } from "@/utils/contants";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function Home() {
  const {
    shipmentsMethods: { shipments },
  } = useContext(AppContext) as appContextT;
  return (
    <>
      <h2 className="dashboardHeadings">Notifications</h2>
      <div className="py-16">
        <NotificationCard props={notifications[0]} />
        <ViewMore value="notifications" />
      </div>
      {shipments.length && (
        <>
          <h2 className="dashboardHeadings ">Shipments</h2>
          <div className="py-16">
            {shipments.map((shipment, index) => (
              <ShipmentCard key={`ss${index}`} shipment={shipment} />
            ))}
            <ViewMore value="shipments" />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
