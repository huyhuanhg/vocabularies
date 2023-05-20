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
  padding: 1rem 2.2rem 1rem 1rem !important;
  position: relative;
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

  .char-count {
    position: absolute;
    font-size: 14px;
    color: #828282;
  }
`;

export const Suggest = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .suggest {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    min-height: 25px;
    margin-bottom: 20px;
    position: relative;
    span {
      position: relative;
      display: inline-block;
      width: 25px;
      &.hide {
        position: relative;
        color: rgba(0, 0, 0, 0.3);
        font-size: 16px;
        font-weight: normal;
        top: calc(100% - 8px);
        &::after {
          position: absolute;
          content: "";
          display: block;
          width: 10px;
          height: 3px;
          background: #7e7e7e;
          bottom: calc(100% - 2px);
          left: 50%;
          width: calc(100% - 5px);
          transform: translateX(-50%);
        }
        &::before {
          position: absolute;
          content: "?";
          display: block;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 15px;
        }
      }
    }
  }
  .suggest-msg {
    text-align: center;
    color: red;
    padding: 0 20px;
    margin-bottom: 30px;
    min-height: 20px;
  }

  .ButtonEffect {
    width: 200px;

    &__btn {
      padding: 8pt;
    }
  }
`;

export default Container;
