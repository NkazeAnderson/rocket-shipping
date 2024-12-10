import React, { useContext } from "react";
import ShipmentCard from "./ShipmentCard";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function Shipments() {
  const {
    shipmentsMethods: { shipments },
  } = useContext(AppContext) as appContextT;
  return (
    <>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-24">
        {shipments.map((shipment, index) => (
          <ShipmentCard key={`ss${index}`} shipment={shipment} />
        ))}
      </div>
    </>
  );
}

export default Shipments;
