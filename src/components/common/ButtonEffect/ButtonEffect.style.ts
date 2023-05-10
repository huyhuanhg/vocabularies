import styled from "styled-components";

export const Container = styled.button<{cssType?: "text" | "btn", state?: "active" | "error" |"normal", space?: number, isEffect: boolean}>`
  position: relative;
  text-align: center;
  width: 100%;
  border-radius: 50px;
  border: none;
  margin: auto;
  background: ${(props) => props.disabled ? "#b6b5b5" : (props.state === "active" ? "#459724" : (props.state === "error" ? "#b13535" : "#c9c6c6"))};
  transition: all 0.3s;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 -10px 100px 10px rgba(0, 0, 0, .1);

  .ButtonEffect__btn {
    background: ${(props) => props.disabled ? "#c8c5c5" : (props.state === "active" ? "#58bd2f" : (props.state === "error" ? "#d34e4e" : "#fff"))};
    border-radius: 50px;
    padding: 12pt;
    top: -${(props => props.isEffect ? 0 : props.space)}px;
    position: relative;
    cursor: ${(props => props.disabled ? "not-allowed" : "pointer")};
    line-height: 100%;
    transition: .1s;

    font-size: ${props => props.cssType === "btn" ? "1.25rem" : "1rem"};
    text-transform: ${props => props.cssType === "btn" ? "uppercase" : "none"};
    font-weight: ${props => props.cssType === "btn" ? "bold" : "normal"};
    color: ${(props) => props.disabled ? "#828282" : (props.state === "active" ? "#fff" : (props.state === "error" ? "#fff" : "#000"))};
  }
`;
