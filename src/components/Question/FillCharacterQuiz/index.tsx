import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  RefObject,
  createRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import FillMissingWordQuizProps from "./FillCharacterQuiz.props";
import Container, * as Style from "./FillCharacterQuiz.style";
import { Arr } from "@/helpers";

const FillCharacterQuiz: FC<FillMissingWordQuizProps> = ({
  vocabulary,
  setAnswer,
}) => {
  const [fillResult, setFillResult] = useState<string[]>([]);
  const [elRefs, setElRefs] = useState<RefObject<HTMLInputElement>[]>([]);

  useEffect(() => {
    if (vocabulary) {
      setElRefs((elRefs) =>
        Array.from(vocabulary.content).map((_, i) => elRefs[i] || createRef())
      );
      setFillResult((fillResult) =>
        Array.from(vocabulary.content).map((_, i) => "")
      );
    }
  }, [vocabulary]);

  useEffect(() => {
    if (vocabulary) {
      let result = null;
      result =
        vocabulary && fillResult.join("").length === vocabulary.content.length
          ? vocabulary.content.toLowerCase() ===
            fillResult.join("").toLowerCase()
          : null;

      setAnswer(result);
    }
  }, [fillResult]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const cloneFill = [...fillResult];
    cloneFill[index] = e.target.value;
    setFillResult(cloneFill);
  };

  const getPlaceholderRandom = (vocabulary: any) => {
    if (!vocabulary || !Object(vocabulary).hasOwnProperty("content")) {
      return [];
    }

    const wordInfo = vocabulary.content.split("");

    return Arr.randomItems(
      Array.from({ length: wordInfo.length }, (_, index) => index),
      Math.floor((Math.random() * wordInfo.length * 3.5) / 10 + 1)
    );
  };

  const placeholderRandomMemo = useMemo(
    () => getPlaceholderRandom(vocabulary),
    [vocabulary]
  );

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const lastIndex = vocabulary.content.length - 1;

    if (
      ((/[a-zA-Z0-9]/.test(e.key) && e.key.length === 1) ||
        e.key === "ArrowRight") &&
      lastIndex > index &&
      elRefs[index + 1] &&
      Object(elRefs[index + 1]).hasOwnProperty("current")
    ) {
      elRefs[index + 1].current?.focus();
    }

    if (
      (e.key === "Backspace" || e.key === "ArrowLeft") &&
      index > 0 &&
      elRefs[index - 1] &&
      Object(elRefs[index - 1]).hasOwnProperty("current")
    ) {
      elRefs[index - 1].current?.focus();
    }
  };

  const renderAnswer = (word?: string) => {
    if (!word) {
      return null;
    }

    const wordInfo = word.split("");

    return (
      <form>
        {wordInfo.map((char, index) => (
          <Style.QuizAnswerItem
            key={`${word}_${char}_${index}`}
            ref={elRefs[index]}
            autoComplete="off"
            type="text"
            max={1}
            maxLength={1}
            autoFocus={index === 0}
            tabIndex={index}
            onKeyUp={(e) => handleKeyUp(e, index)}
            placeholder={
              placeholderRandomMemo.includes(index) ? wordInfo[index] : ""
            }
            onChange={(e) => handleChange(e, index)}
            value={fillResult[index]}
          />
        ))}
      </form>
    );
  };

  return (
    <Container>
      <Style.QuizHeader>Điền từ</Style.QuizHeader>
      <Style.QuizContent>
        {vocabulary?.translate} ({vocabulary?.type})
      </Style.QuizContent>
      <Style.QuizAnswer>{renderAnswer(vocabulary?.content)}</Style.QuizAnswer>
    </Container>
  );
};

export default FillCharacterQuiz;
