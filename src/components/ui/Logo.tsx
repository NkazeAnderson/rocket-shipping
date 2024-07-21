import { companyInfo } from "@/utils/contants";
import Image from "next/image";
import React from "react";

function Logo({ white, persist }: { white?: boolean; persist?: boolean }) {
  return (
    <div className="flex items-center space-x-16">
      <Image width={60} height={54} src={companyInfo.logo} alt="logo-small" />
      <p
        className={`text-[35px] font-extrabold italic ${
          !persist && "hidden"
        } lg:inline ${white ? "text-white" : "text-black"}`}
      >
        {companyInfo.name}
      </p>
    </div>
  );
}

export default Logo;
