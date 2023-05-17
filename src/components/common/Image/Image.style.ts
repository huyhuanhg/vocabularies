import Image from "next/image";
import styled from "styled-components";

const Container = styled(Image)`
  opacity: 0;
  transition: opacity .2s;

  &.loaded {
    opacity: 1;
  }
`;

export default Container