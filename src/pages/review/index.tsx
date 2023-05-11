import { useEffect, useState } from "react";
import Container, * as Style from "./Review.style";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchReviewCount } from "@/stores/review/action";
import { Button, ButtonEffect, Loading, Modal } from "@/components/common";
import { useRouter } from "next/router";
import Question from "@/components/Question";
import Progress from "@/components/Progress";
import CircleProgress from "@/components/CircleProgress";
import { LoadingRing } from "@/components/common";
import { updateReviewedAt } from "@/stores/user/action";

const Review = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    reviewReducer: {
      review: { loading, count: reviewCount, wordStorages },
    },
    userReducer: {
      detail: { loading: userReviewedLoading },
    },
  } = useSelector(({ reviewReducer, userReducer }: Record<string, any>) => ({
    reviewReducer,
    userReducer,
  }));

  const [progressInfo, setProgressInfo] = useState({
    current: 0,
    trueCount: 0,
    falseCount: 0,
    isFinish: false,
  });

  const [isShowModalClose, setIsShowModalClose] = useState(false);

  useEffect(() => {
    dispatch(fetchReviewCount({ user: user.email }));
  }, []);

  useEffect(() => {
    if (progressInfo.isFinish) {
      dispatch(updateReviewedAt({ user: user.email }));
    }
  }, [progressInfo.isFinish]);

  useEffect(() => {
    if (progressInfo.current === reviewCount && progressInfo.current !== 0) {
      setProgressInfo({
        ...progressInfo,
        isFinish: true,
      });
    }
  }, [progressInfo.current]);

  const nextQuiz = (key?: "trueCount" | "falseCount") => {
    const progressCloneData = {
      ...progressInfo,
    };

    setProgressInfo({
      ...progressCloneData,
      ...(key && { [key]: progressCloneData[key] + 1 }),
      current:
        progressCloneData.current === reviewCount - 1
          ? progressCloneData.current
          : progressCloneData.current + 1,
      isFinish: !key || progressCloneData.current === reviewCount - 1,
    });
  };

  const renderCongratulatoryMessage = (percent: number) => {
    switch (true) {
      case percent >= 90:
        return "Tuyệt vời";
      case percent >= 50:
        return "Cố gắng thêm chút nhé!";
    }

    return "Cố lên, bạn có thể làm được mà!";
  };

  return (
    <Container>
      {loading && <Loading full />}
      {!loading && reviewCount === 0 && (
        <Style.Empty>
          <span>Không có gì để ôn tập!</span>
          <Button onClick={() => router.push("/")}>Quay lại</Button>
        </Style.Empty>
      )}
      {!loading &&
        wordStorages[progressInfo.current] &&
        !progressInfo.isFinish && (
          <Style.Question>
            <Style.Header>
              <Progress
                total={reviewCount}
                current={progressInfo.current + 1}
              />
              <Style.BtnClose onClick={() => setIsShowModalClose(true)} />
            </Style.Header>
            <Question
              index={progressInfo.current}
              current={wordStorages[progressInfo.current]}
              total={reviewCount}
              wordStorages={wordStorages}
              next={nextQuiz}
            />
            <Modal
              open={isShowModalClose}
              footer={null}
              closable={false}
              centered
              onCancel={() => setIsShowModalClose(false)}
            >
              <Style.ModalCloseMsg>
                Bạn có chắc chắn muốn thoát?
                <br /> Kết quả ôn tập của bạn đã được lưu lại.
              </Style.ModalCloseMsg>
              <Style.ModalCloseBtnGroup>
                <ButtonEffect
                  state="active"
                  click={() => setIsShowModalClose(false)}
                >
                  ÔN TẬP TIẾP
                </ButtonEffect>
                <ButtonEffect click={() => nextQuiz()}>THOÁT</ButtonEffect>
              </Style.ModalCloseBtnGroup>
            </Modal>
          </Style.Question>
        )}
      {progressInfo.isFinish && (
        <Style.Congratulatory>
          {userReviewedLoading ? (
            <LoadingRing full />
          ) : (
            <div className="wrapper">
              <p className="message">
                {renderCongratulatoryMessage(
                  (progressInfo.trueCount /
                    (progressInfo.trueCount + progressInfo.falseCount)) *
                    100
                )}
              </p>
              <CircleProgress
                total={progressInfo.trueCount + progressInfo.falseCount}
                value={progressInfo.trueCount}
              />
              <p className="Congratulatory__info">
                Bạn đã trả lời đúng {progressInfo.trueCount}/
                {progressInfo.trueCount + progressInfo.falseCount} câu
              </p>
              <ButtonEffect state="active" click={() => router.push("/")}>
                TRỞ LẠI
              </ButtonEffect>
            </div>
          )}
        </Style.Congratulatory>
      )}
    </Container>
  );
};

export default Review;
