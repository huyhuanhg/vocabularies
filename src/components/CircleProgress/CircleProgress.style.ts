import styled from "styled-components";

const Container = styled.div`
  width: 326px;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;

  .chart-wrapper {
    margin-top: 20px;
    position: relative;

    &__value {
      height: 86px;
      width: 86px;
      transform: translate(-50%, -50%);
      color: #ffcb08;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      position: absolute;
      font-size: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      margin: auto;
      display: block;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      .progress {
        stroke-dasharray: 559.203 559.203;
        stroke-dashoffset: 559.203;
        stroke-linecap: round;
        transition: stroke-dashoffset 0.3s;
      }
    }
  }
`;

export default Container;
