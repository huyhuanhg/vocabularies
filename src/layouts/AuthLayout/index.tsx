import { FC, useEffect } from "react";
import { auth } from "@/configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { LoadingRing } from "@/components/common";
import AuthLayoutProps from "./AuthLayout.props";
import { useSelector } from "react-redux";

const Layout: FC<AuthLayoutProps> = ({
  component: Component,
  layout: LayoutUI,
  ...pageProps
}) => {
  const [loggedInUser, loading] = useAuthState(auth);
  const { push } = useRouter();
  const {
    review: { loading: fetchReviewDataLoading },
  } = useSelector(({ reviewReducer }: Record<string, any>) => reviewReducer);
  useEffect(() => {
    if (!loading && !loggedInUser) {
      push("/auth/login");
    }
  }, [loading, loggedInUser, push]);

  return (
    <main>
      {(loading || fetchReviewDataLoading) && <LoadingRing full />}
      {loggedInUser &&
        loggedInUser?.email &&
        (LayoutUI ? (
          <LayoutUI user={loggedInUser}>
            <Component {...pageProps} user={loggedInUser} />
          </LayoutUI>
        ) : (
          <Component {...pageProps} user={loggedInUser} />
        ))}
    </main>
  );
};

export default Layout;
