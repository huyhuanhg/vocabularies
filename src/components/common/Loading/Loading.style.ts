import styled from "styled-components";

export const Container = styled.div<{ full?: boolean }>`
  width: ${(props) => (props.full ? "100vw" : "100%")};
  height: ${(props) => (props.full ? "100vh" : "100%")};
  position: ${(props) => (props.full ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;
