import React, { useContext } from "react";
import ConversationCard from "./ConversationCard";
import ShipmentCard from "./ShipmentCard";
import { locations, shipments, users } from "@/utils/contants";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function Shipments() {
  const { shipments } = useContext(AppContext) as appContextT;
  return (
    <>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-24">
        {shipments.map((shipment, index) => (
          <ShipmentCard key={`ss${index}`} props={shipment} />
        ))}
      </div>
    </>
  );
}

export default Shipments;
