import { FC, useEffect, useMemo, useState } from "react";
import ObjectiveTest from "../ObjectiveTest";
import ChoiceMissingWordQuizProps from "./ChoiceMissingWordQuiz.props";
import { Arr } from "@/helpers";
import parse from "html-react-parser";

const ChoiceMissingWordQuiz: FC<ChoiceMissingWordQuizProps> = ({
  reviewId,
  vocabularies,
  vocabulary,
  getQuestionStr,
  setAnswer,
}) => {
  const [quizState, setQuizState] = useState<{
    question: string;
    answers: any[];
  }>({
    question: "",
    answers: [],
  });

  useEffect(() => {
    if (vocabulary) {
      const vocabularyQuizIndex = vocabularies.findIndex(
        (vocabulary) => vocabulary.id === reviewId
      );

      const { en_sentence, content } = vocabulary;
      let questionText = getQuestionStr(en_sentence, content, "fill");

      const answers = [
        {
          id: vocabulary.id,
          label: vocabulary.content,
          value: vocabulary.content,
          isTrue: true,
        },
        ...Arr.randomItems(vocabularies, 3, [vocabularyQuizIndex]).map(
          ({ id, content }: any) => ({
            id,
            label: content,
            value: content,
            isTrue: false,
          })
        ),
      ];

      setQuizState({
        question: `<span>${questionText}</span>`,
        answers: Arr.randomOrder(answers),
      });
    }
  }, [vocabulary]);
  return (
    <ObjectiveTest
      title="Chọn từ thích hợp điền vào chỗ trống"
      question={parse(quizState.question)}
      answers={quizState.answers}
      setAnswer={setAnswer}
      reviewId={reviewId}
    />
  );
};

export default ChoiceMissingWordQuiz;
