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
  padding: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.2;
  color: #06072e;

  form {
    text-align: center;
  }
`;

export const QuizAnswer = styled.div`
  border-radius: 20px;
  margin-top: 10px;
  background: linear-gradient(83.47deg, #ffcb08 9.02%, #ff9600 90.81%);
  padding: 5px;
  width: auto;

  form {
    background: #fff;
    width: auto;
    border-radius: 15px;
    padding: 12pt 20pt;
  }
`;

export const QuizAnswerItem = styled.input<{disabled: boolean}>`
  width: ${props => props.disabled ? "10px" : "25px"};
  margin: 3px;
  height: 30px;
  border: none;
  font-size: 20px;
  padding-bottom: 10px;
  text-align: center;
  border-bottom:  ${props => props.disabled ? "0" : "4px solid #b9b9b9"};
  font-family: inherit;

  &:focus {
    outline: none !important;
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;
export default Container;
