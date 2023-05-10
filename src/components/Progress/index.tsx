import { FC } from "react";
import Container, * as Style from "./Progress.style";
import ProgressProps from "./Progress.props";

const Progress: FC<ProgressProps> = ({ total, current }) => {
  return (
    <Container>
      <label>
        {current} / {total}
      </label>
      <Style.Progress className="progress_bar" value={current} max={total} />
    </Container>
  );
};

export default Progress;
