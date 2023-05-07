import { FC, useEffect } from "react";
import { auth } from "@/configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Loading } from "@/components/common";
import AuthLayoutProps from "./AuthLayout.props";

const Layout: FC<AuthLayoutProps> = ({
  component: Component,
  ...pageProps
}) => {
  const [loggedInUser, loading] = useAuthState(auth);
  const { push } = useRouter();
  useEffect(() => {
    if (!loading && !loggedInUser) {
      push("/auth/login");
    }
  }, [loading, loggedInUser, push]);

  return (
    <main>
      {loading && <Loading full />}
      {loggedInUser && loggedInUser?.email && (
        <Component {...pageProps} user={loggedInUser} />
      )}
    </main>
  );
};

export default Layout;
