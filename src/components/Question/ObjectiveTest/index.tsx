import { FC } from "react";
import Container, * as Style from "./ObjectiveTest.style";
import ObjectiveTestProps from "./ObjectiveTest.props";

const ObjectiveTest: FC<ObjectiveTestProps> = ({
  title
}) => {
  return (
    <Container>
      <Style.QuizHeader>
        {title}
      </Style.QuizHeader>
      <Style.QuizContent>
        <div className="content">
          Success always <span className="word_primary">smiles</span> upon
          people who are diligent.
        </div>
      </Style.QuizContent>
      <Style.QuizAnswer>
        <Style.QuizAnswerItem>
          <div className="content active">Sự hiến máu</div>
        </Style.QuizAnswerItem>
        <Style.QuizAnswerItem>
          <div className="content">Sự hiến máu</div>
        </Style.QuizAnswerItem>
        <Style.QuizAnswerItem>
          <div className="content">Sự hiến máu</div>
        </Style.QuizAnswerItem>
      </Style.QuizAnswer>
    </Container>
  );
};

export default ObjectiveTest;
