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
    max-width: 500px;
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
      gap: 1rem;

      .btn-wrapper {
        .ButtonEffect__btn {
          padding: 0;
          line-height: 0;
        }
      }
    }

    &-control {
      position: absolute;
      bottom: 20px;
      width: 70%;
      height: 80px;
      max-width: 350px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export default Container;
