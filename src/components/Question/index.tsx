import { FC, useEffect, useState } from "react";
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
  reviewId,
  total,
  vocabularies,
  next,
}) => {
  const [quizType, setQuizType] = useState<number>(
    Math.floor(Math.random() * 4 + 1)
  );

  const [audioUs, setAudioUs] = useState<HTMLAudioElement | null>(null);
  const [answerIsPass, setAnswerIsPass] = useState<null | boolean>(null);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isShowTrans, setIsShowTrans] = useState(false);
  const [currentVocabulary, setCurrentVocabulary] = useState<any>(null);

  useEffect(() => {
    if (index < total) {
      setQuizType(Math.floor(Math.random() * 4 + 1));
    }
  }, [index, total]);

  useEffect(() => {
    let vocabulary = null;

    if (reviewId && vocabularies.length > 0) {
      const vocabularyIndex = vocabularies.findIndex(
        (vocabularyItem) => vocabularyItem.id === reviewId
      );
      vocabulary = vocabularyIndex > -1 ? vocabularies[vocabularyIndex] : null;
      const { audio_us } = vocabulary;
      setAudioUs(new Audio(audio_us));
    }
    setCurrentVocabulary(vocabulary);
  }, [reviewId, vocabularies]);

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

  const playAudio = (speed: number = 1) => {
    if (!audioUs) {
      return;
    }

    audioUs.playbackRate = speed;
    audioUs.play();
  };

  const renderSwitchType = (type: number) => {
    switch (type) {
      case 1: {
        return (
          <SentenceEngQuiz
            reviewId={reviewId}
            currentVocabulary={currentVocabulary}
            vocabularies={vocabularies}
            setAnswer={setAnswerIsPass}
            getQuestionStr={getEnSentence}
          />
        );
      }
      case 2: {
        return (
          <ChoiceMissingWordQuiz
            reviewId={reviewId}
            currentVocabulary={currentVocabulary}
            vocabularies={vocabularies}
            setAnswer={setAnswerIsPass}
            getQuestionStr={getEnSentence}
          />
        );
      }
      case 3: {
        return (
          <FillCharacterQuiz
            vocabulary={currentVocabulary}
            setAnswer={setAnswerIsPass}
          />
        );
      }
    }
    return (
      <FillListenWordQuiz
        vocabulary={currentVocabulary}
        playAudio={playAudio}
        setAnswer={setAnswerIsPass}
      />
    );
  };

  const handleNextQuiz = () => {
    setIsShowResult(false);
    setIsShowTrans(false);
    next(answerIsPass ? "trueCount" : "falseCount");
    let vocabulary = null;

    if (reviewId && vocabularies.length > 0) {
      const vocabularyIndex = vocabularies.findIndex(
        (vocabularyItem) => vocabularyItem.id === reviewId
      );
      vocabulary = vocabularyIndex > -1 ? vocabularies[vocabularyIndex] : null;
    }

    setCurrentVocabulary(vocabulary);
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
                <p className="word-content">{currentVocabulary?.content}</p>
                <p className="word-phonetic">{currentVocabulary?.ipa_us}</p>
                <p className="en-hint">
                  {currentVocabulary?.translate} ({currentVocabulary?.type})
                </p>
                <p className="sentence-en">
                  {parse(
                    getEnSentence(
                      currentVocabulary?.en_sentence,
                      currentVocabulary?.content
                    )
                  )}
                </p>
                <p className="sentence-trans">
                  {currentVocabulary?.vi_sentence}
                </p>
              </div>
              <div className="quiz-result-answer-action">
                <div className="btn-wrapper btn-sound-answer">
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
