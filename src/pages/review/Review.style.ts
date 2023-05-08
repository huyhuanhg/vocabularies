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
  background: url('/btn_close.svg');
  background-repeat: no-repeat;
  background-position: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export default Container;
