import { Button, ButtonEffect, Chart } from "@/components/common";
import Layout from "@/layouts/VocabularyLayout";
import { fetchReviewData } from "@/stores/review/action";
import Container, * as Style from "@/styles/Home.style";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    count: chartData,
    review: { count: reviewCount },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);

  useEffect(() => {
    dispatch(fetchReviewData({ user: user.email }));
  }, []);

  useEffect(() => {
    console.log("reviewCount :>> ", reviewCount);
  }, [reviewCount]);

  return (
    <Layout>
      <Container>
        <Chart data={chartData} unit="từ" />
        {reviewCount === 0 ? (
          <Style.Message>Không có từ nào để ôn tập</Style.Message>
        ) : (
          <Style.Message>Có {reviewCount} từ cần ôn tập</Style.Message>
        )}
        {reviewCount > 0 && (
          <ButtonEffect
            style={{
              marginTop: 20,
              width: 250,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            state="active"
            click={() => router.push("/review")}
          >
            Ôn tập ngay
          </ButtonEffect>
        )}
      </Container>
    </Layout>
  );
};

export default Home;
