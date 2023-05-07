import { useSignOut } from "react-firebase-hooks/auth";
import { FC } from "react";
import Container, * as Style from "./User.style";
import { User } from "firebase/auth";
import { Button } from "@/components/common";
import { auth } from "@/configs/firebase";
import { Space } from "antd";
import { useRouter } from "next/router";

const User: FC<{ user: User }> = ({ user }) => {
  const [singOut] = useSignOut(auth);
  const router = useRouter();

  const logout = () => {
    dispatchEvent(
      new StorageEvent("storage", {
        key: "userinfo",
        newValue: null,
      })
    );
    singOut();
  };
  return (
    <Container>
      <Style.UserInfo>
        <Style.Avatar src={user.photoURL} size={100} />
        <Style.UserName>{user.displayName}</Style.UserName>
        <Style.UserEmail>{user.email}</Style.UserEmail>
      </Style.UserInfo>
      <Space>
        <Button onClick={() => router.push("/")}>Trang Chủ</Button>
        <Button onClick={logout}>Logout</Button>
      </Space>
    </Container>
  );
};

export default User;
