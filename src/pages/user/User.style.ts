import { Avatar as AAvatar } from "antd";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding-top: 30vh;
  text-align: center;

  button {
    width: fit-content;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled(AAvatar)`
  margin-bottom: 20px;
`;

export const UserName = styled.div`
  font-size: 24px;
  margin-bottom: 15px;
`;

export const UserEmail = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
`;

export default Container;
