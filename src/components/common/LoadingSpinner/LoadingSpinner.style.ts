import styled from "styled-components";

const Container = styled.div<{ full?: boolean }>`
  width: ${(props) => (props.full ? "100vw" : "100%")};
  height: ${(props) => (props.full ? "100vh" : "100%")};
  position: ${(props) => (props.full ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, ${(props) => (props.full ? ".5" : ".2")});
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinnerWrapper = styled.div<{ size: number }>`
  color: official;
  display: inline-block;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const SpinnerItem = styled.div<{
  index: number;
  size: number;
}>`
  transform-origin: ${(props) => props.size / 2}px ${(props) => props.size / 2}px;
  animation: lds-spinner 1.2s linear infinite;

  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: ${(props) => (0.225 * props.size) / 6}px;
    left: ${(props) => props.size / 2 - (0.225 * props.size) / 6}px;
    width: ${(props) => (0.225 * props.size) / 3}px;
    height: ${(props) => 0.225 * props.size}px;
    border-radius: 20%;
    background: #fff;
  }

  &:nth-of-type(${(props) => props.index + 1}) {
    transform: rotate(${(props) => props.index * 30}deg);
    animation-delay: ${(props) => -1.1 + props.index / 10}s;
  }
`;
export default Container;
