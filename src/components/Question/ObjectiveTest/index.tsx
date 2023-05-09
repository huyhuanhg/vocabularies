import { FC, useEffect } from "react";
import Container, * as Style from "./ObjectiveTest.style";
import ObjectiveTestProps from "./ObjectiveTest.props";

const ObjectiveTest: FC<ObjectiveTestProps> = ({
  title,
  question,
  answers,
  setAnswer,
}) => {
  const renderQuizAnswerItem = () => {
    return (
      <Style.QuizAnswer>
        {answers.map((answer) => (
          <Style.QuizAnswerItem
            key={answer.id}
            onClick={() => setAnswer(answer.isTrue)}
          >
            <div className="content">{answer.label}</div>
          </Style.QuizAnswerItem>
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
