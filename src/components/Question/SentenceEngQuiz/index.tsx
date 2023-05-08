import { FC } from "react";
import SentenceEngQuizProps from "./SentenceEngQuiz.props";
import ObjectiveTest from "../ObjectiveTest";

const SentenceEngQuiz: FC<SentenceEngQuizProps> = ({
  reviewId,
  vocabularies,
}) => {
  return (
    <ObjectiveTest title="Chọn nghĩa của từ được gạch chân" />
  );
};

export default SentenceEngQuiz;
