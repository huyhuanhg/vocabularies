import styled from "styled-components";
import css from "styled-jsx/css";

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

export const RingWrapper = styled.div<{ size: number }>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const RingItem = styled.div<{
  index: number;
  size: number;
  dotCount: number;
}>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${props => props.size - (props.size / 10 * 2)}px;
  height: ${props => props.size - (props.size / 10 * 2)}px;
  margin: ${props => props.size / 10}px;
  border: ${props => props.size / 10}px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #faad14 transparent transparent transparent;

  &:nth-of-type(${(props) => props.index + 1}) {
    ${(props) =>
      props.index !== props.dotCount - 1 &&
      `animation-delay: ${-0.45 + props.index * 0.15}s;`}
  }
`;
export default Container;
