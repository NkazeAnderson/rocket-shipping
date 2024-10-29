"use client";
import React, { useContext } from "react";
import { FaBraille, FaComment, FaFileLines, FaHandDots } from "react-icons/fa6";
import Pill from "../ui/Pill";
import Image from "next/image";
import { FaMap } from "react-icons/fa";
import { Context } from "./DashBoardWrapper";
import {
  dashBoardContextT,
  shipmentT,
  shipmentWithHistoryT,
  subjectT,
} from "@/types/types";
import { profilePicPlaceholder } from "@/utils/contants";

function ShipmentCard({ props }: { props: shipmentWithHistoryT }) {
  const subject: subjectT = "shipment";
  const { setShowSidePanel, setSidePanelContent } = useContext(
    Context
  ) as dashBoardContextT;

  return (
    <div className="dashboardCardBG w-full rounded-15 text-white border border-success mb-24">
      <div className="flex justify-between items-center">
        <div className="bg-black flex w-full rounded-t-15 py-8 px-16 border-b border-white items-center justify-between space-x-8">
          <div>
            <FaBraille /> <h5 className="font-bold">#{props.shipment.$id}</h5>
          </div>
          <Pill
            text={props.histories[props.histories.length - 1].status}
            isprimary={false}
          />
        </div>
      </div>
      <div className=" px-48  rounded-15 py-8 space-y-8">
        <p>
          <strong>Product:</strong>
          <span className="ml-8"> {props.shipment.product}</span>
        </p>
        <p>
          <strong>Sender:</strong>
          <span className="ml-8">{props.shipment.shipperName}</span>
        </p>
        <p>
          <strong>Destination:</strong>
          <span className="ml-8">
            {props.shipment.destinationCityStateCountry}
          </span>
        </p>
        <p>
          <strong>Mode:</strong>
          <span className="ml-8">{props.shipment.mode}</span>
        </p>
        <p>
          <strong>Package:</strong>
          <span className="ml-8">{props.shipment.package}</span>
        </p>

        <div className="flex items center justify-between py-16">
          <div>
            <span
              className=" hover:cursor-pointer"
              onClick={() => {
                setShowSidePanel((prev) => !prev);
                setSidePanelContent({ id: props?.shipment.$id, subject });
              }}
            >
              <Pill text="Info" isprimary icon={FaFileLines} />
            </span>
          </div>
          <div>
            <span
              className=" hover:cursor-pointer"
              onClick={() => {
                setShowSidePanel((prev) => !prev);
                setSidePanelContent({
                  id: props.shipment?.$id,
                  maps: true,
                  subject,
                });
              }}
            >
              <Pill text="Maps" isprimary outlined icon={FaMap} />
            </span>
          </div>
        </div>
      </div>
      {typeof props.shipment.courier !== "string" && (
        <div className="flex justify-between items-center bg-black p-8 rounded-b-15">
          <div className="flex space-x-8">
            <Image
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              className="rounded-full"
              src={props.shipment.courier.image || profilePicPlaceholder}
              alt="courier  image"
            />
            <div>
              <h5 className="font-bold">{props.shipment.courier.name}</h5>
              <p>Courier</p>
            </div>
          </div>
          <div
            className="rounded-[100%] p-16 md:p-24 bg-success text-white hover:cursor-pointer"
            onClick={() => {
              setShowSidePanel((prev) => !prev);
              setSidePanelContent({
                id: props.shipment.conversationId as string,
                subject: "conversation",
              });
            }}
          >
            <FaComment size={25} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShipmentCard;
