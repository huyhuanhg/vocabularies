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
  rate,
}) => {
  const [elRefs, setElRefs] = useState<RefObject<HTMLInputElement>[]>([]);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array.from(vocabulary.content).map((_, i) => elRefs[i] || createRef())
    );

    setAnswer(null);
  }, [vocabulary]);

  useEffect(() => {
    if (elRefs.length > 0) {
      elRefs.forEach((elRef, index) => {
        if (elRef.current && !/[a-z]/i.test(vocabulary.content[index])) {
          elRef.current.value = vocabulary.content[index];
        }
      });
    }
  }, [elRefs]);

  const handleChange = () => {
    const fillResult = elRefs.reduce(
      (result, inputRef, index) =>
        `${result}${
          inputRef.current?.disabled
            ? vocabulary.content[index]
            : inputRef.current?.value[0] || ""
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

    let nextIndex: number | null = null;

    if (elRefs[index]?.current) {
      if (progress === 1) {
        nextIndex = index === lastIndex ? lastIndex : index + 1;

        if (
          elRefs[nextIndex] &&
          elRefs[nextIndex].current &&
          elRefs[nextIndex].current?.disabled &&
          nextIndex !== lastIndex
        ) {
          nextIndex++;
        }
      } else {
        nextIndex = index === 0 ? 0 : index - 1;

        if (
          elRefs[nextIndex] &&
          elRefs[nextIndex].current &&
          elRefs[nextIndex].current?.disabled &&
          nextIndex !== 0
        ) {
          nextIndex--;
        }
      }
    }

    if (nextIndex !== null && elRefs[nextIndex] && elRefs[nextIndex].current) {
      elRefs[nextIndex].current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const currentRef = elRefs[index].current;

    if (e.key === "Tab" || e.key === "ArrowRight") {
      handleFocus(1, index);
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      if (e.key === "Backspace") {
        if (currentRef?.value) {
          currentRef!.value = "";
          handleChange();
          return;
        }
      }
      handleFocus(-1, index);
      return;
    }

    if (e.altKey || e.ctrlKey) {
      return;
    }

    if (/^Key([a-z])$/i.test(e.code)) {
      const key = e.code.replace(/^Key([a-z])$/i, "$1").toLocaleLowerCase();

      if (!currentRef?.value) {
        currentRef!.value = key;
        handleFocus(1, index);
      } else {
        if (elRefs[index + 1]?.current) {
          if(!elRefs[index + 1]?.current?.disabled) {
            elRefs[index + 1].current!.value = key;
          } else if(elRefs[index + 2]?.current) {
            elRefs[index + 2].current!.value = key;
          }
        }
        handleFocus(1, index + 1);
      }

      handleChange();
      return;
    }
  };

  const getPlaceholderRandom = (strArr: string) => {
    let percent = 50;
    switch (true) {
      case rate >= 5:
        percent = 0;
        break;
      case rate > 3.6:
        percent = 25;
        break;
      case rate > 2.2:
        percent = 30;
        break;
      case rate > 1:
        percent = 40;
        break;
    }

    return Arr.randomItems(
      Array.from({ length: strArr.length }, (_, index) => index),
      Math.ceil((strArr.replaceAll(/\W/g, "").length * percent) / 100),
      Array.from(strArr.matchAll(/\W/g)).map(({ index }) => index) as number[]
    );
  };

  const placeholderRandom = useMemo(
    () => getPlaceholderRandom(vocabulary.content),
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
              placeholder={placeholderRandom.includes(index) ? char : ""}
              disabled={!/[a-z]/i.test(char)}
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
