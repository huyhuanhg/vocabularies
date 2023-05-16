import { FC } from "react";
import Container, * as Style from "./LoadingSpinner.style";
import LoadingSpinnerProps from "./LoadingSpinner.props";

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ full, size }) => {
  const dotCount = 12;

  const renderDot = () => {
    return Array.from({ length: dotCount }, (_, index) => index).map(
      (index) => (
        <Style.SpinnerItem
          key={`LoadingRollerProps_dot_${index}`}
          index={index}
          size={size ?? 80}
        />
      )
    );
  };
  return (
    <Container full={full} className="LoadingSpinner">
      <Style.SpinnerWrapper size={size ?? 80}>{renderDot()}</Style.SpinnerWrapper>
    </Container>
  );
};

export default LoadingSpinner;
