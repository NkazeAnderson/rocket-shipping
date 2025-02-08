"use client";
import React, { useContext } from "react";
import { FaBraille, FaComment, FaFileLines, FaHandDots } from "react-icons/fa6";
import Pill from "../ui/Pill";
import Image from "next/image";
import { FaMap } from "react-icons/fa";
import { Context } from "./DashBoardWrapper";
import { appContextT, dashBoardContextT, subjectT } from "@/types/types";
import { contactInfo, profilePicPlaceholder } from "@/utils/contants";
import { shipmentT } from "@/types/schemas";
import { AppContext } from "../ContextProviders/AppProvider";
import Link from "next/link";

function ShipmentCard({ shipment }: { shipment: shipmentT }) {
  const subject: subjectT = "shipment";
  const { setShowSidePanel, setSidePanelContent } = useContext(
    Context
  ) as dashBoardContextT;
  const {
    userMethods: { user },
    conversationsMethods: { conversations },
  } = useContext(AppContext) as appContextT;
  const conversation = conversations.find(
    (item) => item.member1 === user?.$id || item.member2 === user?.$id
  );

  const shipmentStatus = shipment?.extras?.histories?.length
    ? shipment.extras.histories.toReversed()[0].status
    : undefined;
  const courierInfo = shipment?.extras?.courierInfo;

  return (
    <div
      className="dashboardCardBG w-full rounded-15 text-white border border-success mb-24"
      onClick={() => {
        setShowSidePanel((prev) => !prev);
        setSidePanelContent({ id: shipment.$id, subject });
      }}
    >
      <div className="flex justify-between items-center">
        <div className="bg-black flex w-full rounded-t-15 py-8 px-16 border-b border-white items-center justify-between space-x-8">
          <div>
            <FaBraille />{" "}
            <h5 className="font-bold">
              #{shipment.$id ? shipment.$id.slice(0, 7) : "New Shipment"}
            </h5>
          </div>
          {shipmentStatus && (
            <div>
              {shipmentStatus && (
                <Pill
                  text={shipmentStatus}
                  isprimary={
                    shipmentStatus &&
                    ["In Transit", "On Hold", "Cancelled"].includes(
                      shipmentStatus
                    )
                  }
                  danger={
                    shipmentStatus &&
                    ["In Transit", "On Hold", "Cancelled"].includes(
                      shipmentStatus
                    )
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className=" px-48  rounded-15 py-8 space-y-8">
        <p>
          <strong>Product:</strong>
          <span className="ml-8"> {shipment.product}</span>
        </p>
        <p>
          <strong>Sender:</strong>
          <span className="ml-8">{shipment.shipperName}</span>
        </p>
        <p>
          <strong>Destination:</strong>
          <span className="ml-8">{shipment.destination}</span>
        </p>
        <p>
          <strong>Mode:</strong>
          <span className="ml-8">{shipment.mode}</span>
        </p>
        <p>
          <strong>Package:</strong>
          <span className="ml-8">{shipment.package}</span>
        </p>

        <div className="flex items center justify-between py-16">
          <div>
            <span className=" hover:cursor-pointer">
              <Pill text="Info" isprimary icon={FaFileLines} />
            </span>
          </div>
          <div>
            <span
              className=" hover:cursor-pointer"
              onClick={(e) => {
                setShowSidePanel((prev) => !prev);
                setSidePanelContent({
                  id: shipment?.$id,
                  maps: true,
                  subject,
                });
                e.stopPropagation();
              }}
            >
              <Pill text="Maps" isprimary outlined icon={FaMap} />
            </span>
          </div>
        </div>
      </div>
      {courierInfo && (
        <div className="flex justify-between items-center bg-black p-8 rounded-b-15">
          <div className="flex space-x-8">
            <Image
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              className="rounded-full"
              src={courierInfo.image || profilePicPlaceholder}
              alt="courier  image"
            />
            <div>
              <h5 className="font-bold">{courierInfo.name}</h5>
              <p>Courier</p>
            </div>
          </div>
          <Link href={"mailto:" + contactInfo.email}>
            <div
              className="rounded-[100%] p-16 md:p-24 bg-success text-white hover:cursor-pointer"
              // onClick={() => {
              //   setShowSidePanel((prev) => !prev);
              //   setSidePanelContent({
              //     id: conversation?.$id
              //       ? conversation.$id
              //       : user && user.$id === shipment.courier
              //       ? shipment.receiver
              //       : shipment.courier,
              //     subject: "conversation",
              //   });
              // }}
            >
              <FaComment size={25} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ShipmentCard;
