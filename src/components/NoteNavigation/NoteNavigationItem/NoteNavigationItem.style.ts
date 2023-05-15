import styled from "styled-components";

const Container = styled.div<{color: string, active: boolean}>`
  flex: 1 0 0%;
  cursor: pointer;
  position: relative;
  text-align: center;

  .NoteNavigationItem__level-title {
    padding-bottom: 25px;
    font-weight: bold;
    color: ${props => props.active ? "#000" : "#BDBDBD"};
    font-size: ${props => props.active ? "20px" : "15px"};
    transition: .3;
  }

  .NoteNavigationItem__level-star {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 10px;
    display: ${props => props.active ? "block" : "none"};
    transition: .3;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: ${props => props.active ? "12px" : "6px"};;
    bottom: ${props => props.active ? "-3px" : 0};
    border-radius: ${props => props.active ? "6px" : 0};
    width: 100%;
    background-color: ${props => props.color};
    transition: .3;
  }
`;

export default Container;
