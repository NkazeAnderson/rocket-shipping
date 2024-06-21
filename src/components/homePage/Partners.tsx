import { partners } from "@/utils/contants";
import Image from "next/image";
import React from "react";
import SectionTitle from "../SectionTitle";

function Partners() {
  return (
    <div>
      <SectionTitle text="Top Rated and Trusted" />
      <div className="flex justify-between items-center px-8 md:px-48 flex-wrap">
        {partners.map((item, index) => (
          <Image
            key={index}
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
            src={item}
            alt="parter logo"
          />
        ))}
      </div>
    </div>
  );
}

export default Partners;
