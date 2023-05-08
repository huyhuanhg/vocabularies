import { FC } from "react";
import Container from "./Question.style";
import QuestionProps from "./Question.props";
import SentenceEngQuiz from "./SentenceEngQuiz";
import ChoiceMissingWordQuiz from "./ChoiceMissingWordQuiz";
import FillCharacterQuiz from "./FillCharacterQuiz";
import FillListenWordQuiz from "./FillListenWordQuiz";

const Question: FC<QuestionProps> = ({
  index,
  reviewId,
  type,
  total,
  vocabularies,
}) => {
  const renderSwitchType = (type: number) => {
    switch (type) {
      case 1: {
        return (
          <SentenceEngQuiz reviewId={reviewId} vocabularies={vocabularies} />
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
      {renderSwitchType(type)}
    </Container>
  );
};

export default Question;
