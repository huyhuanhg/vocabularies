import { FC } from "react";
import ObjectiveTest from "../ObjectiveTest";
import ChoiceMissingWordQuizProps from "./ChoiceMissingWordQuiz.props";

const ChoiceMissingWordQuiz: FC<ChoiceMissingWordQuizProps> = ({
  reviewId,
  vocabularies,
}) => {
  return (
    <ObjectiveTest title="Chọn từ thích hợp điền vào chỗ trống" />
  );
};

export default ChoiceMissingWordQuiz;
