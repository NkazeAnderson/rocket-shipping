import React from "react";
import ConversationCard from "./ConversationCard";
import ShipmentCard from "./ShipmentCard";

function Shipments() {
  return (
    <>
      <h2 className="dashboardHeadings ">Shipments</h2>
      <div className="py-24">
        <ShipmentCard props={{ id: "pas09828" }} />
      </div>
    </>
  );
}

export default Shipments;
