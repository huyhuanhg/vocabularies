import styled from "styled-components";

const Container = styled.div`
  width: calc(100% - 40px);
  position: relative;
  line-height: 40px;
  padding-left: 20px;

  label {
    position: absolute;
    z-index: 3;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    font-weight: bold;
    color: #0958d9;
  }
`;

export const Progress = styled.div<{ value: number; max: number }>`
  width: calc(100% - 30px);
  height: 15px;
  background: #c3c3c3;
  border-radius: 17px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: ${(props) => (props.value / props.max) * 100}%;
    height: 15px;
    border-radius: 17px;
    background: linear-gradient(83.47deg, #58cc02 9.02%, #23ac38 90.81%);
    z-index: 2;
  }
`;

export default Container;
