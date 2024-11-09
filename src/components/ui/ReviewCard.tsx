import { reviewT } from "@/types/types";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

function ReviewCard({ review }: { review: reviewT }) {
  const stars = [];
  for (let index = 0; index < review.rating; index++) {
    stars.push(index);
  }
  return (
    <div className=" p-16 rounded-45  bg-white w-[60%] min-w-[60%] h-full ">
      <div className=" block md:flex space-x-16">
        <div className=" w-full md:w-[50%]  relative h-[250px] md:h-[350px] rounded-30">
          <Image
            fill
            className=" rounded-30"
            style={{ objectFit: "cover" }}
            src={review.image}
            alt="review"
          />
        </div>

        <div className=" space-y-16">
          <h3>{review.name}</h3>
          <div className="flex items-center space-x-8 text-primary">
            <h5> {review.rating}.0</h5>
            <div className="flex items-center">
              {stars.map((_) => (
                <FaStar size={24} />
              ))}
            </div>
          </div>
          <p>{review.text}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
