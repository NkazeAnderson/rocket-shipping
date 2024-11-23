import { companyInfo, navLinks } from "@/utils/contants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./ui/Logo";

function Footer() {
  return (
    <div className="w-full  bg-black">
      <div className=" space-y-16 md:space-y-0 md:flex flex-1 md:flex-[4] p-[50px] text-white items-start">
        <div className="flex-1 px-8">
          <Logo persist white />
        </div>
        <div className="flex-1 px-8">
          <h4 className="font-bold">About Us</h4>
          <p>
            Global ranking #7 for best shipping agency. We are dedicated and
            passionate about moving your cargo from every source to its
            designated destination
          </p>
        </div>
        <div className="flex-1 px-8 space-y-8">
          <h4 className="font-bold">Contact us</h4>
          {/* <p>
            <strong className="pr-8">Phone:</strong>
            <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
          </p> */}
          <p>
            <strong className="pr-8">Email:</strong>
            <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
          </p>
          {/* <p>
            <strong className="pr-8">Address:</strong> {companyInfo.address}
          </p> */}
        </div>
        <div className="flex-1 px-8 space-y-8">
          <h4 className="font-bold">Quick Links</h4>
          {navLinks.map((item, index) => (
            <p key={index} className="font-bold capitalize ">
              <small>
                <Link href={item.path}> {item.text}</Link>
              </small>
            </p>
          ))}
        </div>
      </div>
      <p className="text-center text-[14px] text-dark-gray">
        rocketShopping @ 2024
      </p>
    </div>
  );
}

export default Footer;
