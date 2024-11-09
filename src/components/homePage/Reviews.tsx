import React from "react";
import SectionTitle from "../SectionTitle";
import ReviewCard from "../ui/ReviewCard";
import ReviewsWrapper from "./ReviewsWrapper";
import { reviews } from "@/utils/contants";

function Reviews() {
  return (
    <div>
      <div className="px-[50%]">
        <hr />
      </div>
      <SectionTitle text="What our clients are saying" />
      <ReviewsWrapper>
        {reviews.map((item, index) => (
          <ReviewCard key={index} review={item} />
        ))}
      </ReviewsWrapper>
    </div>
  );
}

export default Reviews;
