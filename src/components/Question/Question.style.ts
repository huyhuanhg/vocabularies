import { Form } from "antd";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 60px);
`;

export const QuizWrapper = styled.div`
  position: relative;
  height: 100%;
  .quiz-content {
    height: calc(100% - 120px);
    overflow-y: auto;
  }
  .quiz-control {
    position: absolute;
    bottom: 20px;
    width: 70%;
    margin: 0 15%;
    height: 80px;

    .btn-confirm {
      position: relative;
      text-align: center;
      width: 100%;
      height: 50px;
      border-radius: 50px;
      border: none;
      margin: auto;
      background: #b6b5b5;
      transition: all 0.3s;

      &.active {
        background: #459724;
        button {
          background: #58bd2f;
        }
      }

      button {
        position: absolute;
        background: #c8c5c5;
        left: 0;
        top: -6px;
        border: none;
        height: 50px;
        border-radius: 50px;
        color: #828282;
        font-style: normal;
        font-weight: bold;
        width: 100%;
        margin: auto;
        font-family: inherit;
        font-size: 20px;
        transition: all 0.3s;
      }

      &.active {
        background: #459724;

        button {
          background: #58bd2f;
          height: 50px;
          border-radius: 50px;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      }
    }
    .btn-abort {
      cursor: pointer;
      text-align: center;
      margin-top: 0.5rem;
      button {
        cursor: pointer;
        background-color: unset;
        text-decoration: underline;
        font-weight: 700;
        font-family: inherit;
        font-size: inherit;
        border: 0;
      }
    }
  }
`;

export const QuizResult = styled.div<{
  isSuccess: boolean | null;
  open: boolean;
  isShowTrans: boolean;
}>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);

  .quiz-result-answer {
    min-height: 200px;
    overflow: hidden;
    position: absolute;
    bottom: 180px;
    width: 100%;
    border-radius: 20px;
    max-width: 960px;
    left: 50%;
    transform: translateX(-50%);
    background: ${(props) => (props.isSuccess ? "#23ac38" : "#d34e4e")};

    &-wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    &-content {
      flex: 0 0 auto;
      width: 80%;
      margin: 1.5rem 0;
      padding: 0 calc(1.5rem / 2);
      color: #fff;

      .word-content {
        font-weight: bold;
        font-size: 20px;
      }
      .word-phonetic {
        font-size: 16px;
      }
      .en-hint,
      .sentence-en,
      .sentence-trans {
        margin-top: 20px;
        font-size: 16px;
      }
      .sentence-en .word_primary {
        font-weight: bold;
        font-size: 15px;
      }

      .sentence-trans {
        transition: 0.2s;
        opacity: ${(props) => (props.isShowTrans ? 1 : 0)};
      }
    }
    &-action {
      flex: 0 0 auto;
      width: 20%;
      margin: 1.5rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* gap: 1rem; */

      .btn-wrapper {
        line-height: 0;
        margin-bottom: 0.75rem;
        &.btn-sentence-audio {
          width: 40px;
          height: 40px;
          .ButtonEffect {
            height: 100%;
            .ButtonEffect__btn {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
        .ButtonEffect__btn {
          padding: 0;
          line-height: 0;

          .img-wrapper {
            width: 40px;
            height: 40px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }
        }
      }
    }

    &-control {
      position: absolute;
      bottom: 20px;
      width: 70%;
      height: 80px;
      max-width: calc(960px * 70 / 100);
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const QuizReport = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);

  .quiz-report-modal {
    min-height: 300px;
    overflow: hidden;
    position: absolute;
    bottom: 180px;
    width: 100%;
    border-radius: 20px;
    max-width: 960px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 20px;
    &-title {
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 30px;
    }
  }
`;

export const FormReport = styled(Form)`
  .form-control {
    width: 100%;
    padding: 15px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
  }

  .report-control > button {
    display: block;
    cursor: pointer;
  }

  .Report-Btn-Submit {
    background: #c3c3c3;
    outline: none;
    border: 0;
    text-transform: uppercase;
    padding: 10px 25px;
    min-width: 200px;
    margin: 0 auto;
    border-radius: 12px;
  }

  .Report-Btn-Cancel {
    background: none;
    outline: none;
    border: 0;
    text-transform: uppercase;
    text-decoration: underline;
    margin: 20px auto 0;
    font-weight: bold;
  }
`;

export default Container;
