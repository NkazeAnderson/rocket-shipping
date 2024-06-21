import React from "react";

function Sphere({ bottom }: { bottom?: boolean }) {
  return (
    <div
      className={`${
        bottom ? "bottom-0 right-[-200px]" : "top-0 left-[-200px]"
      } absolute w-[100px] md:w-[300px] lg:w-[400px] h-[50px] md:h-[180px] lg:h-[300px] sphereBg rounded-[600px] inline-block`}
    ></div>
  );
}

export default Sphere;
