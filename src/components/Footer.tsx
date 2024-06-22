import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="w-full  bg-black">
      <div className=" space-y-16 md:space-y-0 md:flex flex-1 md:flex-[4] p-[50px] text-white items-start">
        <div className="flex-1">
          <Image
            width={330}
            height={54}
            src={"/Logo-long-white.png"}
            alt="logo-white"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bold">About Us</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut
            lorem ultrices, euismod felis convallis, tempor purus.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-bold">Contact us</h4>
          <p>Phone: 688880000 Email: test@gmail.com Address: Walls red,</p>
        </div>
        <div className="flex-1">
          <h4 className="font-bold">Quick Links</h4>
          <p className="font-bold">Tracking</p>
          <p className="font-bold">Tracking</p>
          <p className="font-bold">Tracking</p>
          <p className="font-bold">Tracking</p>
        </div>
      </div>
      <p className="text-center text-[14px] text-dark-gray">
        rocketShopping @ 2024
      </p>
    </div>
  );
}

export default Footer;
