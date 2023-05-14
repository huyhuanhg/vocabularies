import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import FillListenWordQuizProps from "./FillListenWordQuiz.props";
import Container, * as Style from "./FillCharacterQuiz.style";
import Image from "next/image";
import { ButtonEffect } from "@/components/common";
import { Arr } from "@/helpers";
import parse from "html-react-parser";

const FillListenWordQuiz: FC<FillListenWordQuizProps> = ({
  vocabulary,
  playAudio,
  setAnswer,
  rate,
}) => {
  const [answerState, setAnswerState] = useState("");
  const [maxSuggest, setMaxSuggest] = useState(0);
  const [suggest, setSuggest] = useState<{
    message: string;
    data: string;
    suggestIndex: number[];
  }>({
    message: "",
    data: "",
    suggestIndex: [],
  });
  const [isPlayAudio, setIsPlayAudio] = useState(0);
  const soundRef = useRef<HTMLButtonElement>(null);
  const handleAddSuggest = () => {
    if (suggest.suggestIndex.length < maxSuggest) {
      let suggestIndex = [...suggest.suggestIndex];
      const arrayIndex = Array.from({ length: vocabulary.content.length }).map(
        (_, index) => index
      );
      const indexs = Arr.except(arrayIndex, suggestIndex);
      const randomIndex: number[] = Arr.randomItems(indexs, 1);
      suggestIndex = [...suggestIndex, ...randomIndex];

      const suggestStr = arrayIndex.reduce((txt, index) => {
        return `${txt}${
          suggestIndex.includes(index)
            ? `<span>${vocabulary.content.charAt(index)}</span>`
            : '<span className="hide">&nbsp;</span>'
        }`;
      }, "");

      setSuggest({
        message: "",
        data: suggestStr,
        suggestIndex,
      });
      return;
    }

    setSuggest({
      ...suggest,
      message: "Vượt quá giới hạn gợi ý!",
    });
  };

  useEffect(() => {
    if (answerState) {
      setAnswer(
        vocabulary.content.toLowerCase() ===
          answerState.trim().replace(/\s\s+/, " ").toLowerCase()
      );
    }
  }, [answerState, setAnswer, vocabulary]);

  useEffect(() => {
    if (isPlayAudio && soundRef?.current) {
      soundRef.current.click();
    }
  }, [isPlayAudio]);

  useEffect(() => {
    setAnswerState("");
    setAnswer(null);
    setIsPlayAudio(~~((Math.random() + 1) * 1000000000));
    setSuggest({
      message: "",
      data: "",
      suggestIndex: [],
    });
    const wordLength = vocabulary.content.length;
    let percent = 50;
    switch (true) {
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
    setMaxSuggest(Math.floor((wordLength * percent) / 100));
  }, [vocabulary]);

  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerState(e.target.value);
  };

  return (
    <Container>
      <Style.QuizHeader>Nghe và viết lại</Style.QuizHeader>
      <Style.QuizContent>
        <ButtonEffect btnRef={soundRef} space={4} click={() => playAudio()}>
          <Image
            src={"/sound-answer.svg"}
            alt="play_sound"
            width={60}
            height={60}
          />
        </ButtonEffect>
        <ButtonEffect space={4} click={() => playAudio(0.5)}>
          <Image
            src={"/sound_slow.svg"}
            alt="play_sound_slow"
            width={50}
            height={50}
          />
        </ButtonEffect>
      </Style.QuizContent>
      <Style.QuizAnswer>
        <input
          autoComplete="off"
          placeholder="Gõ lại từ bạn đã nghe được"
          value={answerState}
          onChange={(e) => handleChangeAnswer(e)}
        />
      </Style.QuizAnswer>

      <Style.Suggest>
        <div className="suggest">{parse(suggest.data)}</div>
        <div className="suggest-msg">{suggest.message}</div>
        <ButtonEffect cssType="text" state="active" click={handleAddSuggest}>
          Thêm gợi ý
        </ButtonEffect>
      </Style.Suggest>
    </Container>
  );
};

export default FillListenWordQuiz;
