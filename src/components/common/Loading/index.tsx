import { Spin } from "antd";
import { FC } from "react";
import LoadingProps from "./Loading.props";
import { Container } from "./Loading.style";

const Loading: FC<LoadingProps> = ({ full }) => {
  return (
    <Container full={full}>
      <Spin />
    </Container>
  );
};

export default Loading;
