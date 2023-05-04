import { auth } from "@/configs/firebase";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import Container from "./Login.style";
import { Button } from "antd";
import { useEffect } from "react";
import Loading from "@/components/common/Loading";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchLogin } from "@/stores/auth/action";

const Login = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [singInWithGoogle, _user, _loading, _err] = useSignInWithGoogle(auth);
  const [loggedInUser, loading] = useAuthState(auth);

  useEffect(() => {
    if (loggedInUser) {
      const { email, displayName, photoURL } = loggedInUser;
      dispatch(fetchLogin({ email, displayName, photoURL })).then(() => {
        dispatchEvent(
          new StorageEvent("storage", {
            key: "userinfo",
            newValue: JSON.stringify(loggedInUser),
          })
        );
      });
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
