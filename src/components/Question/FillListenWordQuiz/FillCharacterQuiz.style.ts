import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center !important;
  padding: 0 20px;
`;

export const QuizHeader = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.2;
  color: #828282;
  text-align: center;
`;

export const QuizContent = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 15px;

  button {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
    text-transform: none;
    border-radius: 50%;
    background: #c9c6c6;
    border: none;
    padding: 0;
    position: relative;
    &.btn-sound-icon {
      width: 60px;
      height: 60px;
    }
    &.btn-sound-slow-icon {
      width: 50px;
      height: 50px;
    }

    img {
      overflow: clip;
      vertical-align: middle;
      cursor: pointer;
      position: absolute;
      bottom: 1px;
      left: 0;
    }
  }
`;

export const QuizAnswer = styled.div`
  width: 90%;
  border-radius: 20px;
  margin-top: 64px;
  background-color: #fff !important;
  padding: 1rem !important;
  input {
    border: none;
    width: 100%;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
`;

export default Container;
