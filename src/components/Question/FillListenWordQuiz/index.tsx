import { ChangeEvent, FC, useEffect, useState } from "react";
import FillListenWordQuizProps from "./FillListenWordQuiz.props";
import Container, * as Style from "./FillCharacterQuiz.style";
import Image from "next/image";
import { ButtonEffect } from "@/components/common";

const FillListenWordQuiz: FC<FillListenWordQuizProps> = ({
  vocabulary,
  playAudio,
  setAnswer,
}) => {
  const [answerState, setAnswerState] = useState("");
  useEffect(() => {
    if (answerState && vocabulary) {
      setAnswer(
        vocabulary.content.toLowerCase() ===
          answerState.trim().replace(/\s\s+/, " ").toLowerCase()
      );
    }
  }, [answerState]);

  useEffect(() => {
    if (vocabulary) {
      playAudio();
      setAnswerState("");
    }
  }, [vocabulary]);

  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerState(e.target.value);
  };

  return (
    <Container>
      <Style.QuizHeader>Nghe và viết lại</Style.QuizHeader>
      <Style.QuizContent>
        <ButtonEffect space={4} click={() => playAudio()}>
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
    </Container>
  );
};

export default FillListenWordQuiz;
