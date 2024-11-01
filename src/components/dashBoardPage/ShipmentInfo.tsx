"use client";
import {
  dashBoardContextT,
  locationT,
  shipmentHistoryT,
  shipmentT,
  shipmentWithHistoryT,
  userT,
} from "@/types/types";
import React, { useContext, useEffect, useRef } from "react";
import { FaLandmark, FaPhone } from "react-icons/fa";
import { FaLocationPin, FaMessage, FaPerson } from "react-icons/fa6";
import Pill from "../ui/Pill";
import { Context } from "./DashBoardWrapper";
import { shipmentHistory } from "@/utils/contants";

function UserDetails({ user, location }: { user: userT; location: string }) {
  return (
    <div className="w-full p-16">
      <div className="pb-16">
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary" size={20} />
          <h5 className=" text-brown font-bold">Name</h5>
        </div>
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary opacity-0" size={20} />
          <p className="">{user.name}</p>
        </div>
      </div>
      <div className="pb-16">
        <div className="flex space-x-8 items-center">
          <FaMessage className="text-primary" size={20} />
          <h5 className=" text-brown font-bold">Email</h5>
        </div>
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary opacity-0" size={20} />
          <p className="">{user.email}</p>
        </div>
      </div>
      <div className="pb-16">
        <div className="flex space-x-8 items-center">
          <FaLocationPin className="text-primary" size={20} />
          <h5 className=" text-brown font-bold">Address</h5>
        </div>
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary opacity-0" size={20} />
          <p className="">{`${location}`}</p>
        </div>
      </div>
      <div className="pb-16">
        <div className="flex space-x-8 items-center">
          <FaPhone className="text-primary" size={20} />
          <h5 className=" text-brown font-bold">Phone</h5>
        </div>
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary opacity-0" size={20} />
          <p className="">+17767263217</p>
        </div>
      </div>
    </div>
  );
}

function ShipmentData({ heading, data }: { heading: string; data: string }) {
  return (
    <div className=" w-1/2 lg:w-1/3 my-16">
      <h5 className="text-brown font-bold">{heading}:</h5>
      <p>{data}</p>
    </div>
  );
}

function ShipmentInfo({ info }: { info: shipmentWithHistoryT }) {
  const { sidePanelContent } = useContext(Context) as dashBoardContextT;
  const firstElement = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      firstElement.current && firstElement.current.scrollIntoView(false);
    }, 1000);
  }, [sidePanelContent?.id]);
  return (
    <>
      <div ref={firstElement} className="p-16 rounded-15 w-full bg-black">
        <h3 className=" text-white font-bold">
          Shipment No: {info.shipment.$id}
        </h3>
      </div>
      <div className="flex justify-start w-full p-16 items-center sticky top-0  bg-black/70 text-white space-x-16">
        <h4 className="font-bold">Status:</h4>
        <div className="w-fit animate-pulse ease-linear duration-[4000]">
          <Pill
            text={info.histories[info.histories.length - 1].status}
            isprimary
          />
        </div>
      </div>
      <div className="p-16">
        <h2 className="dashboardHeadings text-center">Users</h2>

        <div className="lg:flex">
          <div className="lg:w-1/2">
            <h4 className="font-bold text-brown">Sender Information</h4>
            <UserDetails
              user={{
                name: info.shipment.shipperName,
                email: info.shipment.shipperEmail,
              }}
              location={info.shipment.origin}
            />
          </div>
          {typeof info.shipment.receiver !== "string" && (
            <div className="lg:w-1/2">
              <h4 className="font-bold text-brown">Receiver Information</h4>
              <UserDetails
                user={info.shipment.receiver}
                location={info.shipment.destination}
              />
            </div>
          )}
        </div>
        <h2 className="dashboardHeadings text-center">Shipment Information</h2>
        <div className="flex flex-wrap">
          <ShipmentData heading="Origin" data={`${info.shipment.origin}`} />
          <ShipmentData
            heading="Destination"
            data={`${info.shipment.destination}`}
          />
          <ShipmentData heading="Payment" data={info.shipment.paymentMethod} />
          <ShipmentData
            heading="Status"
            data={info.histories[info.histories.length - 1].status}
          />
          <ShipmentData heading="Mode" data={info.shipment.mode} />
          <ShipmentData
            heading="Quantity"
            data={info.shipment.quantity.toString()}
          />
          <ShipmentData
            heading="Weight"
            data={info.shipment.weight.toString()}
          />
          <ShipmentData heading="Product" data={info.shipment.product} />
          <ShipmentData heading="Package" data={info.shipment.package} />
          <ShipmentData
            heading="Pickup Date"
            data={info.shipment.pickupDate.split("T")[0]}
          />
          <ShipmentData
            heading="Delivery Date"
            data={info.shipment.deliveryDate.split("T")[0]}
          />
          <ShipmentData heading="ETA" data={info.shipment.eta} />
          {typeof info.shipment.courier !== "string" && (
            <ShipmentData heading="Handler" data={info.shipment.courier.name} />
          )}
        </div>
        <h2 className="dashboardHeadings text-center">Shipment History</h2>
        <table className=" w-full table-auto my-16">
          <thead className={`my-8 py-16 bg-dark-gray/20`}>
            <tr>
              <th>Date:</th>
              <th>Location:</th>
              <th>Status:</th>
            </tr>
          </thead>
          <tbody>
            {info.histories.map((item, index) => (
              <tr
                key={item.$id}
                className={`my-8 ${index % 2 === 1 && "bg-dark-gray/20"}`}
              >
                <td>{item.date}</td>
                <td>{`${item.currentLocation}`}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShipmentInfo;
