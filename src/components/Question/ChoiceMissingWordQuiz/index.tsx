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
    const { en_sentence, pattern } = vocabulary;
    let questionText = getQuestionStr(en_sentence, pattern, "fill");

    const uniqueContentVocabularies = vocabularies.reduce(
      (result: any, vocabularyItem) => {
        if (
          !result.hasOwnProperty(vocabularyItem.content) &&
          vocabularyItem.content !== vocabulary.content
        ) {
          result[vocabularyItem.content] = vocabularyItem;
        }

        return result;
      },
      {}
    );

    const answers = [
      {
        id: vocabulary.id,
        label: vocabulary.pattern || vocabulary.content,
        value: vocabulary.content,
        isTrue: true,
      },
      ...Arr.randomItems(Object.values(uniqueContentVocabularies), 3).map(
        ({ id, content, pattern }: any) => ({
          id,
          label: pattern || content,
          value: content,
          isTrue: false,
        })
      ),
    ];

    setQuizState({
      question: `<span>${questionText}</span>`,
      answers: Arr.randomOrder(answers),
    });
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
