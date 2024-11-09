import Footer from "@/components/Footer";
import { aboutPartners, ourValues } from "@/utils/contants";
import Image from "next/image";
import React from "react";

function AboutUs() {
  return (
    <div className="w-full h-full bg-success/10 overflow-y-auto overflow-x-hidden">
      <div className="pt-[10svh]">
        <div className="lg:w-3/4 mx-auto p-8 lg:p-32">
          <h1 className="text-success text-center hidden lg:block">
            We are passionate about making moving cargo from every origin to its
            assigned destination
          </h1>
          <h3 className="text-success text-center block lg:hidden">
            We are passionate about making moving cargo from every origin to its
            assigned destination
          </h3>
          <p className="px-16 lg:px-[150px] italic text-dark-gray">
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
              <div key={index} className="lg:basis-1/2 p-16 items-stretch">
                <div className=" flex flex-col items-center p-24 h-full  border border-success rounded-15">
                  <Image width={60} height={60} src={item.image} alt="value" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full p-16 bg-primary/10 flex justify-center">
          <div className="px-16 space-y-8 lg:px-32 flex flex-col items-center lg:w-1/2">
            <h1 className="text-center hidden lg:block">
              {`''We believe in a more open and integrated eCommerce ecosystem where
              retailers, partners, and developers work together for a better
              shopping experience.''`}
            </h1>
            <h3 className="text-center block lg:hidden">
              {`''We believe in a more open and integrated eCommerce ecosystem where
              retailers, partners, and developers work together for a better
              shopping experience.''`}
            </h3>
            <Image
              className="rounded-full"
              width={100}
              height={100}
              src={"/courier.png"}
              alt="value"
            />
            <h4>Alex Moshtinburg</h4>
            <p className="text-bold text-dark-gray">
              Co-founder | Rocket Shipping Agency
            </p>
          </div>
        </div>
        <div className="px-14 py-[100px] space-y-16">
          <h2 className="text-center text-success">
            Trusted by the {`web's`} largest shopping sites and companies
          </h2>

          <div className="flex lg:items-center items-start lg:justify-center lg:space-x-16 flex-wrap lg:flex-nowrap">
            {aboutPartners.map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center my-8 basis-1/2 lg:basis-0"
              >
                <Image
                  width={200}
                  height={100}
                  src={item.image}
                  alt="company  logo"
                />
                <h5 className=" font-bold">{item.text}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
