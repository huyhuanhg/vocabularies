import { FC, useEffect, useState } from "react";
import Container, * as Style from "./ObjectiveTest.style";
import ObjectiveTestProps from "./ObjectiveTest.props";
import { ButtonEffect } from "@/components/common";

const ObjectiveTest: FC<ObjectiveTestProps> = ({
  reviewId,
  title,
  question,
  answers,
  setAnswer,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(null);

  useEffect(() => {
    if(reviewId) {
      setCurrentAnswer(null)
    }
  }, [reviewId])

  const renderQuizAnswerItem = () => {
    return (
      <Style.QuizAnswer>
        {answers.map((answer) => (
          <ButtonEffect
            key={answer.id}
            click={() => {
              setCurrentAnswer(answer.id);
              setAnswer(answer.isTrue);
            }}
            cssType="text"
            state={answer.id === currentAnswer ? "active" : "normal"}
            style={{ marginTop: 20 }}
          >
            {answer.label}
          </ButtonEffect>
        ))}
      </Style.QuizAnswer>
    );
  };

  return (
    <Container>
      <Style.QuizHeader>{title}</Style.QuizHeader>
      <Style.QuizContent>
        <div className="content">{question}</div>
      </Style.QuizContent>
      {renderQuizAnswerItem()}
    </Container>
  );
};

export default ObjectiveTest;
