import { ButtonEffect, Chart } from "@/components/common";
import Layout from "@/layouts/VocabularyLayout";
import { fetchReviewData } from "@/stores/review/action";
import Container, * as Style from "@/styles/Home.style";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { CountdownProps, Statistic } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Countdown } = Statistic;

const Home = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    count: chartData,
    review: { count: reviewCount, countDown },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);

  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    dispatch(fetchReviewData({ user: user.email }));
  }, []);

  useEffect(() => {
    setCountdown(countDown);
  }, [countDown]);

  const onCountDowned: CountdownProps["onChange"] = (val) => {
    if (typeof val === "number" && val < 0) {
      setCountdown(0)
      dispatch(fetchReviewData({ user: user.email }));
    }
  };

  return (
    <Layout>
      <Container>
        <Chart data={chartData} unit="từ" />
        {reviewCount === 0 ? (
          <Style.Message>
            {Math.floor(Math.random() * 2) === 1
              ? "Chưa có gì để ôn tập"
              : "Nghỉ ngơi chút nhé!"}
          </Style.Message>
        ) : (
          <Style.Message>
            Có {reviewCount > 30 ? `hơn 30` : reviewCount} từ cần ôn tập
          </Style.Message>
        )}
        <ButtonEffect
          style={{
            marginTop: 20,
            width: 250,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          state="active"
          click={() => {
            const audio = new Audio("/clicksoundeffect.mp3");
            audio.play().catch(() => {
              {
              }
            });
            router.push("/review");
          }}
          disabled={reviewCount === 0}
        >
          {countDown === 0 && "Ôn tập ngay"}
          {countDown > 0 && (
            <Countdown
              value={Date.now() + countdown}
              onChange={onCountDowned}
            />
          )}
        </ButtonEffect>
      </Container>
    </Layout>
  );
};

export default Home;
