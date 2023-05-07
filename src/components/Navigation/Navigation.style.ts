import styled from "styled-components";

const Container = styled.nav`
  position: absolute;
  bottom: 0;
  background: #f2f2f2;
  width: 100%;
  box-shadow: -10px -10px 10px rgba(189, 189, 189, 0.2),
    6px 6px 10px rgba(189, 189, 189, 0.2);
  z-index: 200;
  ul {
    display: flex;
  }
`;

export const Item = styled.li<{ isActive: boolean }>`
  flex: 1 1 25%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  background: ${(props) => (props.isActive ? "#fff" : "inherit")};
  &:not(:last-child) {
    border-right: 1px solid #d9d9d9;
  }
  img {
    margin-bottom: 10px;
  }

  &:hover {
    background: #fff;
  }
`;

export default Container;
