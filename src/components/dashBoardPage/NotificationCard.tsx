import React from "react";
import { FaBraille, FaHandDots } from "react-icons/fa6";

function NotificationCard() {
  return (
    <div className="dashboardCardBG w-full rounded-15 text-white border border-success">
      <div className="bg-black flex w-full rounded-t-15 py-8 px-16 border-b border-white items-center space-x-8">
        <FaBraille /> <h5 className="font-bold">New Shipment Registered</h5>
      </div>
      <div className=" px-48  rounded-15 py-8">
        <p>
          New Shipment from New York to Miami is now registered for delivery
          ORDER NO: RS-108287177271
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;
