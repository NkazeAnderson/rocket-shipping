import React from "react";
import { FaBraille, FaComment, FaFileLines, FaHandDots } from "react-icons/fa6";
import Pill from "../ui/Pill";
import Image from "next/image";
import { FaMap } from "react-icons/fa";

function ShipmentCard() {
  return (
    <div className="dashboardCardBG w-full rounded-15 text-white">
      <div className="flex justify-between items-center">
        <div className="bg-black flex w-full rounded-t-15 py-8 px-16 border-b border-white items-center justify-between space-x-8">
          <div>
            <FaBraille /> <h5 className="font-bold">#RS-1547273</h5>
          </div>
          <Pill text="In Transit" isprimary={false} />
        </div>
      </div>
      <div className=" px-48  rounded-15 py-8">
        <p>
          New Shipment from New York to Miami is now registered for delivery
          ORDER NO: RS-108287177271
        </p>
        <div className="flex items center justify-between py-16">
          <div>
            <span>
              <Pill text="Info" isprimary icon={FaFileLines} />
            </span>
          </div>
          <div>
            <span>
              <Pill text="Maps" isprimary outlined icon={FaMap} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-black p-8 rounded-b-15">
        <div className="flex space-x-8">
          <Image
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
            className="rounded-full"
            src="/courier.png"
            alt=""
          />
          <div>
            <h5 className="font-bold">Anthony miller</h5>
            <p>Courier</p>
          </div>
        </div>
        <div className="rounded-[100%] p-16 md:p-24 bg-success text-white">
          <FaComment size={25} />
        </div>
      </div>
    </div>
  );
}

export default ShipmentCard;
