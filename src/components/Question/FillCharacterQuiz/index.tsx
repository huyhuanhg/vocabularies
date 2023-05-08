import { FC, useEffect } from "react";
import FillMissingWordQuizProps from "./FillCharacterQuiz.props";
import Container, * as Style from "./FillCharacterQuiz.style";

const FillCharacterQuiz: FC<FillMissingWordQuizProps> = ({ vocabulary }) => {
  useEffect(() => {
    console.log("vocabukary :>> ", vocabulary);
  });

  const renderAnswer = (word: string) => {
    const wordInfo = word.split("");
  };

  return (
    <Container>
      <Style.QuizHeader>Điền từ</Style.QuizHeader>
      <Style.QuizContent>Nói chuyện, thảo luận (verb)</Style.QuizContent>
      <Style.QuizAnswer>
        <form>
          <Style.QuizAnswerItem
            autoComplete="off"
            type="text"
            max={1}
            maxLength={1}
            autoFocus
          />
          <Style.QuizAnswerItem
            placeholder="a"
            autoComplete="off"
            type="text"
            max={1}
            maxLength={1}
          />
          <Style.QuizAnswerItem
            autoComplete="off"
            type="text"
            max={1}
            maxLength={1}
          />
          <Style.QuizAnswerItem
            autoComplete="off"
            type="text"
            max={1}
            maxLength={1}
          />
        </form>
      </Style.QuizAnswer>
    </Container>
  );
};

export default FillCharacterQuiz;
