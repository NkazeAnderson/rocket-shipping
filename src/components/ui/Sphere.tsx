import React from "react";

function Sphere({ bottom }: { bottom?: boolean }) {
  return (
    <div
      className={`${
        bottom ? "bottomSphere" : " topSphere"
      } top-0 left-[-200px] absolute w-[100px] md:w-[300px] lg:w-[400px] h-[50px] md:h-[180px] lg:h-[300px] sphereBg rounded-[600px]  border border-success/10`}
    ></div>
  );
}

export default Sphere;
