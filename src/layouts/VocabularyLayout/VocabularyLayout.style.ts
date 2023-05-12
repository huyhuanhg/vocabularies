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

export const Content = styled.div`
  height: calc(100vh - 80px);
  overflow-y: auto;
`;

export default Container;
