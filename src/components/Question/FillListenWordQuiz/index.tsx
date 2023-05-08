import { FC, useEffect } from "react";
import FillListenWordQuizProps from "./FillListenWordQuiz.props";
import Container, * as Style from "./FillCharacterQuiz.style";
import Image from "next/image";

const FillListenWordQuiz: FC<FillListenWordQuizProps> = ({ vocabulary }) => {
  useEffect(() => {
    console.log("vocabukary :>> ", vocabulary);
  });

  const renderAnswer = (word: string) => {
    const wordInfo = word.split("");
  };

  return (
    <Container>
      <Style.QuizHeader>Nghe và viết lại</Style.QuizHeader>
      <Style.QuizContent>
        <button className="btn-sound-icon">
          <Image
            src={"https://learn.mochidemy.com/svg/sound.svg"}
            alt="play_sound"
            width={60}
            height={60}
          />
        </button>
        <button className="btn-sound-slow-icon">
          <Image
            src={"https://learn.mochidemy.com/svg/sound_slow.svg"}
            alt="play_sound_slow"
            width={50}
            height={50}
          />
        </button>
      </Style.QuizContent>
      <Style.QuizAnswer>
      <input autoComplete="off" placeholder="Gõ lại từ bạn đã nghe được" />
      </Style.QuizAnswer>
    </Container>
  );
};

export default FillListenWordQuiz;
