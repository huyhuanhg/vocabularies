import {
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
  const [elRefs, setElRefs] = useState<RefObject<HTMLInputElement>[]>([]);

  useEffect(() => {
    if (vocabulary) {
      setElRefs((elRefs) =>
        Array.from(vocabulary.content).map((_, i) => elRefs[i] || createRef())
      );
    }
  }, [vocabulary]);

  const handleChange = () => {
    const fillResult = elRefs.reduce(
      (result, inputRef) =>
        `${result}${
          inputRef.current?.disabled ? " " : inputRef.current?.value[0] || ""
        }`,
      ""
    );

    setAnswer(
      fillResult.length === vocabulary.content.length
        ? fillResult.toLocaleLowerCase() === vocabulary.content
        : null
    );
  };

  const getPlaceholderRandom = (strArr: string[]) => {
    return Arr.randomItems(
      Array.from({ length: strArr.length }, (_, index) => index),
      Math.floor((Math.random() * strArr.length * 3.5) / 10 + 1)
    );
  };

  const placeholderRandom = useMemo(
    () => getPlaceholderRandom(vocabulary.content.split("")),
    [vocabulary]
  );

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const lastIndex = vocabulary.content.length - 1;
    if (
      ((/[a-zA-Z0-9']/.test(e.key) && e.key.length === 1) ||
        e.key === "ArrowRight") &&
      lastIndex > index &&
      elRefs[index + 1]
    ) {
      if (!elRefs[index + 1]?.current?.disabled) {
        elRefs[index + 1].current?.focus();
      } else {
        if (lastIndex >= index + 2) {
          elRefs[index + 2].current?.focus();
        }
      }
    }

    if (
      (e.key === "Backspace" || e.key === "ArrowLeft") &&
      index > 0 &&
      elRefs[index - 1]
    ) {
      if (!elRefs[index - 1]?.current?.disabled) {
        elRefs[index - 1].current?.focus();
      } else {
        if (index > 1) {
          elRefs[index - 2].current?.focus();
        }
      }
    }
  };

  const renderAnswer = (word: string) => {
    const wordInfo = word.split("");

    return (
      <form>
        {wordInfo.map((char, index) => {
          return (
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
                placeholderRandom.includes(index) ? wordInfo[index] : ""
              }
              onChange={handleChange}
              disabled={char === " "}
            />
          );
        })}
      </form>
    );
  };

  return (
    <Container>
      <Style.QuizHeader>Điền từ</Style.QuizHeader>
      <Style.QuizContent>
        {vocabulary.translate} ({vocabulary.type})
      </Style.QuizContent>
      <Style.QuizAnswer>{renderAnswer(vocabulary.content)}</Style.QuizAnswer>
    </Container>
  );
};

export default FillCharacterQuiz;
