import { certT } from "@/types/types";
import Image from "next/image";
import React from "react";

function CertCard({ cert }: { cert: certT }) {
  return (
    <div className="flex flex-col space-y-16 items-center">
      <Image
        width={120}
        height={120}
        style={{ objectFit: "contain" }}
        src={cert.image}
        alt="cert"
      />
      <h3 className="font-bold">{cert.name}</h3>
      <p className="text-center">{cert.description}</p>
    </div>
  );
}

export default CertCard;
