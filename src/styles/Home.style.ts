import { Button } from "@/components/common";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 50px 20px 40px;
`;

export const Review = styled(Button)`
  background: #58bd2f;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
  width: 250px;
  color: #fff;
  border: none;
  margin: 20px auto 0;
  display: block;
  cursor: pointer;
  box-shadow: 0 7px #459724;
  text-transform: uppercase;

  &:hover {
    background: #58bd2f !important;
  }
`;

export const Message = styled.div`
  text-align: center;
`;

export default Container;
