import React from "react";
import ConversationCard from "./ConversationCard";
import ShipmentCard from "./ShipmentCard";

function Shipments() {
  return (
    <>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-24">
        <ShipmentCard />
      </div>
    </>
  );
}

export default Shipments;
