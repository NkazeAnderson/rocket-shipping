import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import HeroWrapper from "./HeroWrapper";
import Link from "next/link";

function Hero() {
  return (
    <HeroWrapper>
      <div className="h-[700px] w-full relative">
        <div className="h-full w-full absolute">
          <div className=" absolute w-full h-full z-0">
            <Image
              style={{ zIndex: 0 }}
              src={"/hero1.png"}
              fill
              alt="hero image"
            />
          </div>
          <div className=" bgImg absolute w-full h-full z-0 ">
            <Image
              style={{ zIndex: 0 }}
              src={"/hero2.png"}
              fill
              alt="hero image"
            />
          </div>
          <div className=" bgImg absolute w-full h-full z-0 ">
            <Image
              style={{ zIndex: 0 }}
              src={"/hero3.png"}
              fill
              alt="hero image"
            />
          </div>
          <div className=" bgImg absolute w-full h-full z-0 ">
            <Image
              style={{ zIndex: 0 }}
              src={"/hero4.png"}
              fill
              alt="hero image"
            />
          </div>
        </div>

        <div className="w-full h-full pt-[100px] px-8  md:px-[20%] absolute ">
          <div className="w-full h-full flex flex-col space-y-8 md:space-y-0 md:flex-row items-center justify-center md:space-x-96">
            <div className="p-16 md:p-24 space-y-24 bg-[#004E3A] rounded-15 max-w-[550px] shadow-lg">
              <h1 className="text-center text-white font-bold">
                Moving Cargo Worldwide
              </h1>
              <p className="text-white">
                Ship confidently with real time update of cargo status, cargo
                location and agent contact. Arriving your destination is all we
                know to do best.
              </p>
              <div className="flex justify-center">
                <Link href={"/auth/login"}>
                  <Button props={{ text: "Login" }} />
                </Link>
              </div>
            </div>
            <div className="relative w-[340px] md:w-[440px] h-[250px] md:h-[440px] rounded-15">
              <Image
                className=" absolute rounded-15"
                fill
                src={"/hero1-sm.png"}
                alt="hero image small"
              />
              <Image
                className="foreImg absolute rounded-15"
                fill
                src={"/hero2-sm.png"}
                alt="hero image small"
              />
              <Image
                className="foreImg absolute rounded-15"
                fill
                src={"/hero3-sm.png"}
                alt="hero image small"
              />
              <Image
                className="foreImg absolute rounded-15"
                fill
                src={"/hero4-sm.png"}
                alt="hero image small"
              />
            </div>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
}

export default Hero;
