import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="flex">
      <Image
        className="mobileOnlyView"
        width={60}
        height={54}
        src={"/Logo.png"}
        alt="logo-small"
      />

      <Image
        className="largeOnlyView"
        width={332}
        height={54}
        src={"/Logo-long.png"}
        alt="logo-long"
      />
    </div>
  );
}

export default Logo;
