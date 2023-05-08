import { useEffect, useState } from "react";
import Container, * as Style from "./Review.style";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchReviewCount } from "@/stores/review/action";
import { Button, Loading } from "@/components/common";
import { useRouter } from "next/router";
import Question from "@/components/Question";

const Review = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    review: { ids: reviewIds, loading, count: reviewCount },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);

  const [result, setResult] = useState({});
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchReviewCount({ user: user.email }));
  }, []);

  return (
    <Container>
      {loading && <Loading full />}
      {!loading && reviewCount === 0 && (
        <Style.Empty>
          <span>Không có gì để ôn tập!</span>
          <Button onClick={() => router.push("/")}>Quay lại</Button>
        </Style.Empty>
      )}
      {!loading && reviewCount > 0 && (
        <Style.Question>
          <Style.Process />
          <Question reviewId={reviewIds[reviewIndex]} total={reviewCount} />
        </Style.Question>
      )}
    </Container>
  );
};

export default Review;
