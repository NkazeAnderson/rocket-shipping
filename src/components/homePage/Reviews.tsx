import React from "react";
import SectionTitle from "../SectionTitle";
import ReviewCard from "../ui/ReviewCard";
import ReviewsWrapper from "./ReviewsWrapper";

function Reviews() {
  return (
    <div>
      <div className="px-[50%]">
        <hr />
      </div>
      <SectionTitle text="What our clients are saying" />
      <ReviewsWrapper>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </ReviewsWrapper>
    </div>
  );
}

export default Reviews;
