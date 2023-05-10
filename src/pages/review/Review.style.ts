import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  max-width: 500px;
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
    padding-top: 50px;
    position: relative;

    .message {
      color: #ffcb08;
      font-size: 24px;
      text-align: center;
    }

    .Congratulatory__info {
      text-align: center;
    }

    .ButtonEffect {
      width: 250px;
      margin-top: 3rem;
      left: 50%;
      transform: translateX(-50%);
    }
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
