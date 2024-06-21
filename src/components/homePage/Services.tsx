import React from "react";
import SectionTitle from "../SectionTitle";
import Sphere from "../ui/sphere";
import ServiceCard from "./ServiceCard";

function Services() {
  return (
    <div className="relative">
      <SectionTitle
        text="Professional Services Offered Only By Rocket Shipping"
        colored
      />
      <div className="w-full flex justify-center">
        <p className="text-center px-16 md:px-48 md:w-[500px]">
          Choose from a suite of tools that enhance the journey from shipment
          tracking to returns and all touch points in between.
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-48 p-24 md:p-48 lg:p-96 ">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>

      <div>
        <Sphere />
        <Sphere bottom />
      </div>
    </div>
  );
}

export default Services;
