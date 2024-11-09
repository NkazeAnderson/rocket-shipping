import React from "react";
import SectionTitle from "../SectionTitle";
import CertCard from "./CertCard";
import { certs } from "@/utils/contants";

function WhyUs() {
  return (
    <div className="px-48">
      <SectionTitle text="Why Choose us?" />
      <div className="flex items-center justify-center">
        <p className="text-center max-w-[500px]">
          One word! Excellence. Companies chose us for certified efficiency,
          security and privacy
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 py-24">
        {certs.map((item) => (
          <CertCard key={item.name} cert={item} />
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
