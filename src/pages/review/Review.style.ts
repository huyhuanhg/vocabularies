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
`;

export const Process = styled.div`
`;

export default Container;
