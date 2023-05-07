import { Button, Chart } from "@/components/common";
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
    count: defaultChartValue,
    review: { count: reviewCount },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);

  useEffect(() => {
    dispatch(fetchReviewData({ user: user.email }));
  }, []);

  return (
    <Layout>
      <Container>
        <Chart data={defaultChartValue} unit="từ" />
        {reviewCount === 0 ? (
          <Style.Message>Không có từ nào để ôn tập</Style.Message>
        ) : (
          <Style.Message>Có {reviewCount} từ cần ôn tập</Style.Message>
        )}
        {reviewCount > 0 && (
          <Style.Review onClick={() => router.push("/review")}>
            Ôn tập ngay
          </Style.Review>
        )}
      </Container>
    </Layout>
  );
};

export default Home;
