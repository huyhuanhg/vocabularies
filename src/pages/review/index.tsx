import { useEffect, useState } from "react";
import Container from "./Review.style";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchReviewCount } from "@/stores/review/action";
import { User } from "firebase/auth";

const Review = ({ user }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    review: { data: reviewData },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);

  const [result, setResult] = useState();
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchReviewCount({ user: user.email }));
  }, [])

  return (
    <Container></Container>
  );
};

export default Review;
