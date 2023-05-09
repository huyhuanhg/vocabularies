import { FC, use, useEffect, useState } from "react";
import SentenceEngQuizProps from "./SentenceEngQuiz.props";
import ObjectiveTest from "../ObjectiveTest";
import parse from "html-react-parser";
import { Arr } from "@/helpers";

const SentenceEngQuiz: FC<SentenceEngQuizProps> = ({
  reviewId,
  vocabularies,
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
    const vocabularyQuizIndex = vocabularies.findIndex(
      (vocabulary) => vocabulary.id === reviewId
    );
    const { en_sentence, content } = vocabularies[vocabularyQuizIndex];

    const searchReg = new RegExp(
      `^(${content})\\W|\\W(${content})\\W|\\W(${content})$`
    );

    let questionText = en_sentence.replace(searchReg, (matches: string) =>
      matches.replace(
        content,
        `<span className="word_primary">${content}</span>`
      )
    );

    if (
      !new RegExp(`<span className="word_primary">${content}<\/span>`).test(
        questionText
      )
    ) {
      questionText = questionText.replace(
        content,
        `<span className="word_primary">${content}</span>`
      );
    }

    const answers = [
      {
        id: vocabularies[vocabularyQuizIndex].id,
        label: vocabularies[vocabularyQuizIndex].translate,
        value: vocabularies[vocabularyQuizIndex].content,
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
  }, []);

  return (
    <ObjectiveTest
      title="Chọn nghĩa của từ được gạch chân"
      question={parse(quizState.question)}
      answers={quizState.answers}
      setAnswer={setAnswer}
    />
  );
};

export default SentenceEngQuiz;
