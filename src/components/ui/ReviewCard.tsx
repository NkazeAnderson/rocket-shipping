import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

function ReviewCard() {
  return (
    <div className=" p-16 rounded-45  bg-white w-[60%] min-w-[60%] h-full ">
      <div className=" block md:flex space-x-16">
        <div className=" w-full md:w-[50%]  relative h-[250px] md:h-[350px] rounded-30">
          <Image
            fill
            className=" rounded-30"
            style={{ objectFit: "cover" }}
            src={"/reviewer1.png"}
            alt="review"
          />
        </div>

        <div className=" space-y-16">
          <h3>Anthony A.</h3>
          <div className="flex items-center space-x-8 text-primary">
            <h5> 5.0</h5>
            <div className="flex items-center">
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
