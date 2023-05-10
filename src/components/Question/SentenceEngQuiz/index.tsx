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
  currentVocabulary,
}) => {
  const [quizState, setQuizState] = useState<{
    question: string;
    answers: any[];
  }>({
    question: "",
    answers: [],
  });

  const currentId = useMemo(() => ((reviewId) => reviewId)(reviewId), [reviewId]);

  useEffect(() => {
    if (currentVocabulary) {
      const vocabularyQuizIndex = vocabularies.findIndex(
        (vocabulary) => vocabulary.id === reviewId
      );

      const { en_sentence, content } = currentVocabulary;
      let questionText = getQuestionStr(en_sentence, content);

      const answers = [
        {
          id: currentVocabulary.id,
          label: currentVocabulary.translate,
          value: currentVocabulary.content,
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
  }, [currentVocabulary]);

  return (
    <ObjectiveTest
      reviewId={currentId}
      title="Chọn nghĩa của từ được gạch chân"
      question={parse(quizState.question)}
      answers={quizState.answers}
      setAnswer={setAnswer}
    />
  );
};

export default SentenceEngQuiz;
