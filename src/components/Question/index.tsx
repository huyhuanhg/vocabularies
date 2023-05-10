import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import Container, * as Style from "./Question.style";
import QuestionProps from "./Question.props";
import SentenceEngQuiz from "./SentenceEngQuiz";
import ChoiceMissingWordQuiz from "./ChoiceMissingWordQuiz";
import FillCharacterQuiz from "./FillCharacterQuiz";
import FillListenWordQuiz from "./FillListenWordQuiz";
import Image from "next/image";
import { ButtonEffect } from "../common";
import parse from "html-react-parser";

const Question: FC<QuestionProps> = ({
  index,
  current,
  total,
  vocabularies,
  next,
}) => {
  const [quizType, setQuizType] = useState<number | null>(null);
  const [answerIsPass, setAnswerIsPass] = useState<null | boolean>(null);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isShowTrans, setIsShowTrans] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (index < total) {
      setQuizType(Math.floor(Math.random() * 4 + 1));
    }
  }, [index, total]);

  const getEnSentence = (
    sentence?: string,
    content?: string,
    type: "fill" | "highlight" = "highlight"
  ) => {
    if (!sentence || !content) {
      return "";
    }

    const searchReg = new RegExp(
      `^(${content})\\W|\\W(${content})\\W|\\W(${content})$`
    );

    let questionText = sentence.replace(searchReg, (matches: string) =>
      matches.replace(
        content,
        type === "highlight"
          ? `<span className="word_primary">${content}</span>`
          : "___"
      )
    );

    if (
      !new RegExp(`<span className="word_primary">${content}<\/span>`).test(
        questionText
      )
    ) {
      questionText = questionText.replace(
        content,
        type === "highlight"
          ? `<span className="word_primary">${content}</span>`
          : "___"
      );
    }
    return questionText;
  };

  const playAudio = async (speed: number = 1) => {
    audioRef.current!.playbackRate = speed;
    audioRef.current?.play()
  };

  const renderSwitchType = (type: number | null) => {
    if (null === type) {
      return null;
    }

    switch (type) {
      case 1: {
        return (
          <SentenceEngQuiz
            reviewId={current.id}
            vocabulary={current}
            vocabularies={vocabularies}
            setAnswer={setAnswerIsPass}
            getQuestionStr={getEnSentence}
          />
        );
      }
      case 2: {
        return (
          <ChoiceMissingWordQuiz
            reviewId={current.id}
            vocabulary={current}
            vocabularies={vocabularies}
            setAnswer={setAnswerIsPass}
            getQuestionStr={getEnSentence}
          />
        );
      }
      case 3: {
        return (
          <FillCharacterQuiz
            vocabulary={current}
            setAnswer={setAnswerIsPass}
          />
        );
      }
    }
    return (
      <FillListenWordQuiz
        vocabulary={current}
        playAudio={playAudio}
        setAnswer={setAnswerIsPass}
      />
    );
  };

  const handleNextQuiz = () => {
    setIsShowResult(false);
    setIsShowTrans(false);
    next(answerIsPass ? "trueCount" : "falseCount");
  };

  const handleCheck = () => {
    setIsShowResult(true);
    playAudio();
  };

  const handleForgetClick = () => {
    setAnswerIsPass(false);
    handleCheck();
  };

  return (
    <Container>
      <Style.QuizWrapper>
        <div className="quiz-content">{renderSwitchType(quizType)}</div>
        <div className="quiz-control">
          <ButtonEffect
            disabled={answerIsPass === null}
            state="active"
            click={handleCheck}
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
            <div className="quiz-result-answer-wrapper">
              <div className="quiz-result-answer-content">
                <p className="word-content">{current.content}</p>
                <p className="word-phonetic">{current.ipa_us}</p>
                <p className="en-hint">
                  {current.translate} ({current.type})
                </p>
                <p className="sentence-en">
                  {parse(
                    getEnSentence(current.en_sentence, current.content)
                  )}
                </p>
                <p className="sentence-trans">{current.vi_sentence}</p>
              </div>
              <div className="quiz-result-answer-action">
                <div className="btn-wrapper btn-sound-answer">
                  <audio
                    ref={audioRef}
                    preload="auto"
                    src={current.audio_us}
                  />
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
                    />
                  </ButtonEffect>
                </div>
                <div className="btn-wrapper btn-trans-answer">
                  <ButtonEffect
                    space={4}
                    state={answerIsPass ? "active" : "error"}
                    click={() => setIsShowTrans(!isShowTrans)}
                  >
                    <Image
                      className="icon-btn-answer"
                      src="/translate.svg"
                      width={60}
                      height={60}
                      alt="icon-btn-translate"
                    />
                  </ButtonEffect>
                </div>
              </div>
            </div>
          </div>
          <div className="quiz-result-answer-control">
            <ButtonEffect state="active" click={handleNextQuiz}>
              TIẾP TỤC
            </ButtonEffect>
          </div>
        </Style.QuizResult>
      </Style.QuizWrapper>
    </Container>
  );
};

export default Question;
