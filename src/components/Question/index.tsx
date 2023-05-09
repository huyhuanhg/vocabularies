import { FC, useEffect, useState } from "react";
import Container, * as Style from "./Question.style";
import QuestionProps from "./Question.props";
import SentenceEngQuiz from "./SentenceEngQuiz";
import ChoiceMissingWordQuiz from "./ChoiceMissingWordQuiz";
import FillCharacterQuiz from "./FillCharacterQuiz";
import FillListenWordQuiz from "./FillListenWordQuiz";
import Image from "next/image";

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

  const [answerIsPass, setAnswerIsPass] = useState(null);

  useEffect(() => {
    if (index < total) {
      setQuizType(Math.floor(Math.random() * 4 + 1));
    }
  }, [index, total]);

  const renderSwitchType = (type: number) => {
    switch (type) {
      case 1: {
        return (
          <SentenceEngQuiz
            reviewId={reviewId}
            vocabularies={vocabularies}
            setAnswer={setAnswerIsPass}
          />
        );
      }
      case 2: {
        return (
          <ChoiceMissingWordQuiz
            reviewId={reviewId}
            vocabularies={vocabularies}
          />
        );
      }
      case 3: {
        return <FillCharacterQuiz vocabulary={vocabularies[index]} />;
      }
    }
    return <FillListenWordQuiz vocabulary={vocabularies[index]} />;
  };
  return (
    <Container>
      <Style.QuizWrapper>
        <div className="quiz-content">
          {renderSwitchType(quizType - quizType + 1)}
        </div>
        <div className="quiz-control">
          <div
            className={`btn-confirm ${answerIsPass !== null ? "active" : ""}`}
          >
            <button>KIỂM TRA</button>
          </div>
          <div className="btn-abort">
            <button>Mình không nhớ từ này</button>
          </div>
        </div>
        <div className="quiz-result">
          <div className="quiz-result-answer success">
            <div className="quiz-result-answer-wrapper">
              <div className="quiz-result-answer-content">
                <p className="word-content">semester</p>
                <p className="word-phonetic">/sɪˈmestər/</p>
                <p className="en-hint">Kì học (n)</p>
                <p className="sentence-en">
                  The fall <span className="word_primary">semester</span> will
                  begin in September.
                </p>
                <p className="sentence-trans">
                  Học kì mùa thu sẽ bắt đầu vào tháng Chín.
                </p>
              </div>
              <div className="quiz-result-answer-action">
                <div className="btn-wrapper btn-sound-answer">
                  <button>
                    <Image
                      className="icon-btn-answer"
                      src="/sound-answer.svg"
                      width={60}
                      height={60}
                      alt="icon-btn-answer"
                    />
                  </button>
                </div>
                <div className="btn-wrapper btn-trans-answer">
                  <button>
                    <Image
                      className="icon-btn-answer"
                      src="/translate.svg"
                      width={60}
                      height={60}
                      alt="icon-btn-translate"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="quiz-result-answer-control">
            <div className="btn-continue">
              <button>TIẾP TỤC</button>
            </div>
          </div>
        </div>
      </Style.QuizWrapper>
    </Container>
  );
};

export default Question;
