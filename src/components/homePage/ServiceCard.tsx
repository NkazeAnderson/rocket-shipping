import { serviceT } from "@/types/types";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaCheck, FaPlayCircle } from "react-icons/fa";

function ServiceCard({ service }: { service: serviceT }) {
  return (
    <div className="p-16 flex flex-col serviceCardShadow space-y-24 border-primary hover:border-success border-2 rounded-15 hover:-translate-y-8 relative hover:transition ease-in-out">
      <div className="flex space-x-16">
        <FaPlayCircle size={48} className="text-[#1C274C]" />
        <h3 className="text-success">{service.name}</h3>
      </div>
      <p>{service.description}</p>
      <h3 className="text-success">Popular Features</h3>
      <div>
        {service.features.map((item, index) => (
          <div key={index} className="flex space-x-8 items-center">
            <FaCheck size={20} className="text-success" />
            <p className="">{item}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end text-primary space-x-8 items-center ">
        <Link href={"/auth/login"}>
          <h5>Get Started</h5>
        </Link>
        <FaArrowRight size={20} />
      </div>
    </div>
  );
}

export default ServiceCard;
