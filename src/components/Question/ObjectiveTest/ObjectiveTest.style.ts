import { ButtonEffect } from "@/components/common";
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
  border-radius: 20px;
  margin-top: 15px;
  background: linear-gradient(83.47deg, #ffcb08 9.02%, #ff9600 90.81%);
  padding: 5px;

  .content {
    background: #fff;
    width: auto;
    border-radius: 15px;
    padding: 12pt 20pt;
    font-size: 15px;
    font-weight: bold;

    .word_primary {
      text-decoration: underline;
    }
  }
`;

export const QuizAnswer = styled.div`
  margin-top: 15px;
  width: 100%;
  padding: 0 20px;
`;

export default Container;
