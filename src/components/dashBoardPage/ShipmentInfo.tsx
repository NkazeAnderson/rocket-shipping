import React from "react";
import { FaLandmark, FaPhone } from "react-icons/fa";
import { FaLocationPin, FaMessage, FaPerson } from "react-icons/fa6";

function UserDetails() {
  return (
    <div className="w-full p-16">
      <div className="pb-16">
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary" size={20} />
          <h5 className=" text-brown font-bold">Name</h5>
        </div>
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary opacity-0" size={20} />
          <p className="">Anthony Johnson</p>
        </div>
      </div>
      <div className="pb-16">
        <div className="flex space-x-8 items-center">
          <FaMessage className="text-primary" size={20} />
          <h5 className=" text-brown font-bold">Email</h5>
        </div>
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary opacity-0" size={20} />
          <p className="">AnthonyJohnson@gmail.com</p>
        </div>
      </div>
      <div className="pb-16">
        <div className="flex space-x-8 items-center">
          <FaLocationPin className="text-primary" size={20} />
          <h5 className=" text-brown font-bold">Address</h5>
        </div>
        <div className="flex space-x-8 items-center">
          <FaPerson className="text-primary opacity-0" size={20} />
          <p className="">1234 st, westington, WV,19202</p>
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
    <div className=" w-1/2 lg:w-1/3">
      <h5 className="text-brown font-bold">{heading}:</h5>
      <p>{data}</p>
    </div>
  );
}

function ShipmentInfo() {
  return (
    <div className="">
      <div className="p-16 rounded-15 w-full bg-black">
        <h3 className=" text-white font-bold">Shipment No: Sh-187262732772</h3>
      </div>
      <div className="p-16">
        <h2 className="dashboardHeadings text-center">Users</h2>

        <div className="lg:flex">
          <div className="lg:w-1/2">
            <h4 className="font-bold text-brown">Shipper Information</h4>
            <UserDetails />
          </div>
          <div className="lg:w-1/2">
            <h4 className="font-bold text-brown">Receiver Information</h4>
            <UserDetails />
          </div>
        </div>
        <h2 className="dashboardHeadings text-center">Shipment Information</h2>
        <div className="flex flex-wrap">
          <ShipmentData heading="Origin" data="Tennessee" />
          <ShipmentData heading="Destination" data="Florida" />
          <ShipmentData heading="Status" data="Out for delivery" />
          <ShipmentData heading="Mode" data="Air Frieght" />
          <ShipmentData heading="Quantity" data="1" />
          <ShipmentData heading="Product" data="Pet" />
        </div>
        <h2 className="dashboardHeadings text-center">Shipment History</h2>
        <table className=" w-full">
          <thead>
            <tr>
              <th>Date:</th>
              <th>Time:</th>
              <th>Location:</th>
              <th>Status:</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default ShipmentInfo;
