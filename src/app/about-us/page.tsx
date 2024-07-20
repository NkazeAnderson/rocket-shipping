import { ourValues } from "@/utils/contants";
import Image from "next/image";
import React from "react";

function AboutUs() {
  return (
    <div className="w-full h-full bg-success/10 overflow-y-auto overflow-x-hidden">
      <div className="pt-[10svh]">
        <div className="w-3/4 mx-auto p-32">
          <h1 className="text-success text-center ">
            We are passionate about making moving cargo from every origin to its
            assigned destination
          </h1>
          <p className="px-[150px] italic text-dark-gray">
            At Rocket Shipping, we are passionate about getting your shipments
            delivered securely and efficiently. We understand that peace of mind
            is essential, which is why we provide real-time tracking and
            exceptional customer service. Whether you are a business owner
            shipping across the country or an individual sending a gift to a
            loved one, we are here to make your shipping experience smooth and
            stress-free.
          </p>
          <h1 className="text-center text-black my-32">Our values</h1>
          <div className="flex flex-wrap">
            {ourValues.map((item, index) => (
              <div key={index} className="basis-1/2 p-16 items-stretch">
                <div className=" flex flex-col items-center p-24 h-full  border border-success rounded-15">
                  <Image width={60} height={60} src={item.image} alt="value" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full p-16 bg-primary/10">
          <div className="px-32">
            <h1>
              We believe in a more open and integrated eCommerce ecosystem where
              retailers, partners, and developers work together for a better
              shopping experience.
            </h1>
            <Image
              className="rounded-full"
              width={100}
              height={100}
              src={"/reviewer1.png"}
              alt="value"
            />
            <h4>Alex Moshtinburg</h4>
            <p className="text-bold">Co-founder | Rocket Shipping Agency</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
