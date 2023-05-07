import { useState } from "react";
import Container from "./Review.style";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Review = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    review: { data: reviewData },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);

  const [result, setResult] = useState();
  const [reviewIndex, setReviewIndex] = useState(0);

  return (
    <Container></Container>
  );
};

export default Review;
