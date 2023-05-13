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

  const handleFocus = (progress: -1 | 1, index: number) => {
    const lastIndex = vocabulary.content.length - 1;

    elRefs[index].current?.blur()
    let nextIndex: number | null = null

    if (elRefs[index]?.current) {
      if (progress === 1) {
        if (lastIndex === index) {
          nextIndex = lastIndex
        } else {
          if (elRefs[index + 1]?.current && !elRefs[index + 1].current?.disabled) {
            nextIndex = index + 1
          } else {
            if (elRefs[index + 2]?.current) {
              nextIndex = index + 2
            }
          }
        }
      } else {
        nextIndex = index === 0 ? 0 : index - 1
      }
    }

    if (nextIndex !== null && elRefs[nextIndex] && elRefs[nextIndex].current) {
      elRefs[nextIndex].current?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const currentRef = elRefs[index].current;

    if (e.key === "Tab" || e.key === "ArrowRight") {
      handleFocus(1, index)
      return
    }

    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      if (e.key === "Backspace") {
        if (currentRef?.value) {
          currentRef!.value = ''
          handleChange()
          return
        }
      }
      handleFocus(-1, index)
      return
    }

    if (e.altKey || e.ctrlKey) {
      return
    }

    if (/^Key([a-z])$/i.test(e.code)) {
      const key = e.code.replace(/^Key([a-z])$/i, '$1').toLocaleLowerCase()

      if (!currentRef?.value) {
        currentRef!.value = key
        handleFocus(1, index)
      } else {
        if (elRefs[index + 1]?.current) {
          elRefs[index + 1].current!.value = key
          handleFocus(1, index + 1)
        }
      }

      handleChange()
      return
    }
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

  const renderAnswer = (word: string) => {
    const wordInfo = word.split("");

    return (
      <form style={{ textAlign: "center" }}>
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
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder={
                placeholderRandom.includes(index) ? wordInfo[index] : ""
              }
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
