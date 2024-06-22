import Image from "next/image";
import React from "react";

function CertCard() {
  return (
    <div className="flex flex-col space-y-16 items-center">
      <Image
        width={120}
        height={120}
        style={{ objectFit: "contain" }}
        src={"/cert1.png"}
        alt="cert"
      />
      <h3 className="font-bold">Soc 2 compliance</h3>
      <p className="text-center">
        Certified to meet SOC 2 standards for worry-free data security.
      </p>
    </div>
  );
}

export default CertCard;
