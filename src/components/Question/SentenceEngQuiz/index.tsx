import { FC, useEffect, useMemo, useState } from "react";
import SentenceEngQuizProps from "./SentenceEngQuiz.props";
import ObjectiveTest from "../ObjectiveTest";
import parse from "html-react-parser";
import { Arr } from "@/helpers";

const SentenceEngQuiz: FC<SentenceEngQuizProps> = ({
  reviewId,
  vocabularies,
  setAnswer,
  getQuestionStr,
  vocabulary,
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

      const { en_sentence, pattern } = vocabulary;
      let questionText = getQuestionStr(en_sentence, pattern);

      const answers = [
        {
          id: vocabulary.id,
          label: vocabulary.translate,
          value: vocabulary.content,
          isTrue: true,
        },
        ...Arr.randomItems(vocabularies, 3, [vocabularyQuizIndex]).map(
          ({ id, translate, content }: any) => ({
            id,
            label: translate,
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
      reviewId={reviewId}
      title="Chọn nghĩa của từ được gạch chân"
      question={parse(quizState.question)}
      answers={quizState.answers}
      setAnswer={setAnswer}
    />
  );
};

export default SentenceEngQuiz;
