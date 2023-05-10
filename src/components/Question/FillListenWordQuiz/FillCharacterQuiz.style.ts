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
  display: flex;
  margin-top: 15px;
  gap: 20px;

  .ButtonEffect {
    width: 60px;
    height: 60px;

    .ButtonEffect__btn {
      padding: 0;
      line-height: 0;
    }
  }

  .ButtonEffect:nth-child(2) {
    width: 50px;
    height: 50px;
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

    &:focus {
      outline: none !important;
      background: #fff !important;
    }
  }
`;

export default Container;
