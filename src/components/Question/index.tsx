import { FC, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import Container, * as Style from "./Question.style";
import QuestionProps from "./Question.props";
import SentenceEngQuiz from "./SentenceEngQuiz";
import ChoiceMissingWordQuiz from "./ChoiceMissingWordQuiz";
import FillCharacterQuiz from "./FillCharacterQuiz";
import FillListenWordQuiz from "./FillListenWordQuiz";
import { Image } from "@/components/common";
import { ButtonEffect, LoadingSpinner } from "../common";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { updateReviewWord } from "@/stores/review/action";
import WordStorageType from "@/types/entities/WordStorageType";
import { playSentenceAudio as playSentenceAudioHelper } from "@/helpers/sentence";

const Question: FC<QuestionProps> = ({
  index,
  current,
  total,
  wordStorages,
  next,
}) => {
  const [quizType, setQuizType] = useState<number | null>(null);
  const [audio, setAudio] = useState<{
    id: string | null;
    control: HTMLAudioElement | null;
  }>({ id: null, control: null });
  const [answerIsPass, setAnswerIsPass] = useState<null | boolean>(null);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isShowTrans, setIsShowTrans] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnCheckRef = useRef<HTMLButtonElement>(null);
  const btnContinueRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    review: {
      updateInfo: { loading: updateLoading },
    },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);

  useEffect(() => {
    setAudio({
      id: current.vocabulary.id,
      control: new Audio(current.vocabulary.audio_us),
    });
  }, [current]);

  useEffect(() => {
    if (index < total) {
      setQuizType(
        Math.floor(total > 3 ? Math.random() * 4 + 1 : Math.random() * 2 + 3)
      );
    }
  }, [index, total]);

  const getEnSentence = (
    sentence: string,
    pattern?: string,
    type: "fill" | "highlight" = "highlight"
  ): string => {
    if (!pattern) {
      return sentence;
    }
    const searchReg = new RegExp(`(^|\\W)(${pattern})(\\W|$)`, "i");

    return sentence.replace(searchReg, (matches: string) =>
      matches.replace(
        pattern,
        type === "highlight"
          ? `<span className="word_primary">${pattern}</span>`
          : `<span className="word_fill">${pattern}</span>`
      )
    );
  };

  const playAudio = async (speed: number = 1) => {
    // setAudioError(undefined);
    if (current.vocabulary.id === audio.id && audio.control) {
      audio.control.playbackRate = speed;
      audio.control.play().catch((e) => {
        // setAudioError(e);
      });
      return;
    }
    const newAudio = new Audio(current.vocabulary.audio_us);
    newAudio.playbackRate = speed;
    newAudio.play().catch((e) => {
      // setAudioError(e);
    });
  };
  // const playAudio = async (speed: number = 1) => {
  //   audioRef.current!.playbackRate = speed;
  //   audioRef.current?.play().catch((e) => {
  //     setTimeout(() => {
  //       audioRef.current?.click()
  //     }, 1000)
  //   });
  // };

  const getVocabularies = (wordStorages: WordStorageType[]) =>
    wordStorages.map((wordStorage) => wordStorage.vocabulary);

  const vocabularies = useMemo(
    () => getVocabularies(wordStorages),
    [wordStorages]
  );

  const renderSwitchType = (type: number | null) => {
    if (null === type) {
      return null;
    }

    switch (type) {
      case 1: {
        return (
          <SentenceEngQuiz
            reviewId={current.vocabulary.id}
            vocabulary={current.vocabulary}
            vocabularies={vocabularies}
            setAnswer={setAnswerIsPass}
            getQuestionStr={getEnSentence}
          />
        );
      }
      case 2: {
        return (
          <ChoiceMissingWordQuiz
            reviewId={current.vocabulary.id}
            vocabulary={current.vocabulary}
            vocabularies={vocabularies}
            setAnswer={setAnswerIsPass}
            getQuestionStr={getEnSentence}
          />
        );
      }
      case 3: {
        return (
          <FillCharacterQuiz
            vocabulary={current.vocabulary}
            setAnswer={setAnswerIsPass}
            rate={current.rate}
          />
        );
      }
    }
    return (
      <FillListenWordQuiz
        vocabulary={current.vocabulary}
        playAudio={playAudio}
        setAnswer={setAnswerIsPass}
        rate={current.rate}
      />
    );
  };

  const handleNextQuiz = () => {
    setIsShowResult(false);
    setIsShowTrans(false);
    next(answerIsPass ? "trueCount" : "falseCount");
  };

  const handleEnterCheck = (
    e: KeyboardEvent<HTMLInputElement> | globalThis.KeyboardEvent
  ) => {
    if (e.key !== "Enter") {
      return;
    }
    containerRef.current?.removeEventListener("keyup", handleEnterCheck);
    handleCheck();
  };

  const handleCheck = (isForget?: true) => {
    if (!isForget && answerIsPass === null) {
      return;
    }

    setIsShowResult(true);

    dispatch(
      updateReviewWord({
        wordStorage: current,
        isTrue: answerIsPass as boolean,
      })
    ).finally(() => playAudio());
  };

  const handleEnterContinue = (e: globalThis.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }

    containerRef.current?.removeEventListener("keyup", handleEnterContinue);
    handleNextQuiz();
  };

  const handleForgetClick = () => {
    handleCheck(true);
  };

  const playSentenceAudio = (sentence: string) => {
    playSentenceAudioHelper(sentence);
  };

  useEffect(() => {
    if (answerIsPass !== null) {
      containerRef.current?.addEventListener("keyup", handleEnterCheck);
    } else {
      containerRef.current?.removeEventListener("keyup", handleEnterCheck);
    }
    return () => {
      containerRef.current?.removeEventListener("keyup", handleEnterCheck);
    };
  }, [answerIsPass]);

  useEffect(() => {
    if (!updateLoading && isShowResult) {
      containerRef.current?.addEventListener("keyup", handleEnterContinue);
    } else {
      containerRef.current?.removeEventListener("keyup", handleEnterContinue);
    }
    return () => {
      containerRef.current?.removeEventListener("keyup", handleEnterContinue);
    };
  }, [updateLoading, isShowResult]);

  return (
    <Container ref={containerRef}>
      <Style.QuizWrapper>
        <div className="quiz-content">{renderSwitchType(quizType)}</div>
        <div className="quiz-control">
          <ButtonEffect
            disabled={answerIsPass === null}
            state="active"
            click={handleCheck}
            btnRef={btnCheckRef}
          >
            KIỂM TRA
          </ButtonEffect>
          <div className="btn-abort">
            <button onClick={handleForgetClick}>Mình không nhớ từ này</button>
          </div>
        </div>
        <Style.QuizResult
          isSuccess={answerIsPass}
          open={isShowResult}
          isShowTrans={isShowTrans}
        >
          <div className="quiz-result-answer">
            {updateLoading && <LoadingSpinner />}
            <div className="quiz-result-answer-wrapper">
              <div className="quiz-result-answer-content">
                <p className="word-content">{current.vocabulary.content}</p>
                <p className="word-phonetic">{current.vocabulary.ipa_us}</p>
                <p className="en-hint">
                  {current.vocabulary.translate} ({current.vocabulary.type})
                </p>
                <p className="sentence-en">
                  {parse(
                    getEnSentence(
                      current.vocabulary.en_sentence,
                      current.vocabulary.pattern
                    )
                  )}
                </p>
                <p className="sentence-trans">
                  {current.vocabulary.vi_sentence}
                </p>
              </div>
              <div className="quiz-result-answer-action">
                <div className="btn-wrapper btn-sound-answer">
                  {/* <audio
                    ref={audioRef}
                    preload="auto"
                    src={current.vocabulary.audio_us}
                  /> */}
                  <ButtonEffect
                    space={4}
                    state={answerIsPass ? "active" : "error"}
                    click={() => playAudio()}
                  >
                    <Image
                      className="icon-btn-answer"
                      src="/sound-answer.svg"
                      width={60}
                      height={60}
                      alt="icon-btn-answer"
                      title="Play word audio"
                    />
                  </ButtonEffect>
                </div>
                {current.vocabulary.en_sentence && (
                  <div className="btn-wrapper btn-sentence-audio">
                    <ButtonEffect
                      space={2}
                      click={() =>
                        playSentenceAudio(current.vocabulary.en_sentence)
                      }
                    >
                      <Image
                        className="icon-btn-answer"
                        src="/sound-sentence.svg"
                        width={30}
                        height={30}
                        alt="icon-btn-answer"
                        title="Play sentence audio"
                      />
                    </ButtonEffect>
                  </div>
                )}
                <div className="btn-wrapper btn-trans-answer">
                  <ButtonEffect
                    space={4}
                    state={answerIsPass ? "active" : "error"}
                    click={() => setIsShowTrans(!isShowTrans)}
                  >
                    <Image
                      className="icon-btn-answer"
                      src="/translate.svg"
                      width={40}
                      height={40}
                      alt="icon-btn-translate"
                      title="Translate sentence"
                    />
                  </ButtonEffect>
                </div>
              </div>
            </div>
          </div>
          <div className="quiz-result-answer-control">
            <ButtonEffect
              btnRef={btnContinueRef}
              state="active"
              click={handleNextQuiz}
              disabled={updateLoading || !isShowResult}
            >
              TIẾP TỤC
            </ButtonEffect>
          </div>
        </Style.QuizResult>
      </Style.QuizWrapper>
    </Container>
  );
};

export default Question;
