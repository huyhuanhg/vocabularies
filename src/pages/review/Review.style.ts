import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
`;

export const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  button {
    width: fit-content;
    margin-top: 30px;
  }
`;

export const Question = styled.div`
  height: 100vh;
`;

export const Header = styled.div`
  margin: 0;
  padding: 10px 0;
  display: flex;
  padding-right: 10px;
`;

export const BtnClose = styled.div`
  background: url("/btn_close.svg");
  background-repeat: no-repeat;
  background-position: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const Congratulatory = styled.div`
  height: 100vh;

  .wrapper {
    padding-top: 30px;
    position: relative;
    min-height: 400px;

    .message {
      color: #ffcb08;
      font-size: 24px;
      text-align: center;
    }

    .Congratulatory__info {
      padding: 0 20px;
      text-align: center;

      &__wordDetail {
        margin-top: 10px;
        max-height: 200px;
        background: #fff;
        overflow: auto;
        padding: 6px 4px;
        border-radius: 5px;

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #fafafa;
          border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: #bfbfbf;
          border-radius: 10px;
        }
      }
    }

    .ButtonEffect {
      width: 250px;
      margin-top: 2rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const ResultWordDetail = styled.div<{ state: "error" | "success" }>`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  text-align: left;
  padding: 8px 6px;
  border-radius: 4px;
  margin-bottom: 4px;
  background-color: ${(props) =>
    props.state === "error" ? "#fff1f0" : "#f6ffed"};

  .ResultWordDetail__content {
    width: calc(45% - 21px);
    padding-left: 18px;
    position: relative;
    align-self: center;

    img {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }

  .ResultWordDetail__type {
    width: 42px;
    align-self: center;
  }

  .ResultWordDetail__meaning {
    width: calc(55% - 21px);
    padding-left: 2px;
  }
`;

export const ModalCloseMsg = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 1rem;
  text-align: center;
`;

export const ModalCloseBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 350px;
  margin: 0 auto;
`;

export default Container;
