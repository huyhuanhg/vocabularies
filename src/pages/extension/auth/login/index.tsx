import { auth } from "@/configs/firebase";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import Container from "./Login.style";
import { Button } from "antd";
import { useEffect } from "react";
import Loading from "@/components/common/Loading";

const Login = () => {
  const [singInWithGoogle, _user, _loading, _err] = useSignInWithGoogle(auth);
  const [loggedInUser, loading] = useAuthState(auth);

  useEffect(() => {
    if (loggedInUser) {
      dispatchEvent(
        new StorageEvent("storage", {
          key: "userinfo",
          newValue: JSON.stringify(loggedInUser),
        })
      );
    }
  }, [loggedInUser]);

  const handleGoogleLogin = () => {
    singInWithGoogle();
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Button onClick={handleGoogleLogin} type="primary">
          Đăng nhập
        </Button>
      )}
    </Container>
  );
};

export default Login;
