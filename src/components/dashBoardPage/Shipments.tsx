import React from "react";
import ConversationCard from "./ConversationCard";
import ShipmentCard from "./ShipmentCard";
import { locations, shipments, users } from "@/utils/contants";

function Shipments() {
  return (
    <>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-24">
        <ShipmentCard props={shipments[0]} />
        <ShipmentCard props={shipments[1]} />
      </div>
    </>
  );
}

export default Shipments;
