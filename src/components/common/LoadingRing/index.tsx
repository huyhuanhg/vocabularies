import { FC } from "react";
import Container, * as Style from "./LoadingRing.style";
import LoadingRingProps from "./LoadingRing.props";

const LoadingRing: FC<LoadingRingProps> = ({ full, size }) => {
  const dotCount = 4;

  const renderDot = () => {
    return Array.from({ length: dotCount }, (_, index) => index).map(
      (index) => (
        <Style.RingItem
          key={`LoadingRingProps_dot_${index}`}
          index={index}
          size={size ?? 80}
          dotCount={dotCount}
        />
      )
    );
  };
  return (
    <Container full={full}>
      <Style.RingWrapper size={size ?? 80}>
        {renderDot()}
      </Style.RingWrapper>
    </Container>
  );
};

export default LoadingRing;
