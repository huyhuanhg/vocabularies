import AuthLayout from "@/layouts/AuthLayout";
import store from "@/stores";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import VocabularyLayout from "@/layouts/VocabularyLayout";

interface Props {
  children: ReactNode;
}

const theme = {
  token: {
    colorPrimary: "#faad14",
    colorBgLayout: "#fff",
    borderRadius: 3,
  },
};

const needVocabularyLayout = ["/", "/note", "/course", "/other"];

const HTML: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Head>
          <title>Vocabularies</title>
          <meta name="description" content="Quản lý túi tiền" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link rel="icon" href="/logo.png" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        {children}
      </ConfigProvider>
    </Provider>
  );
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  const isNotLayout = useMemo(
    () =>
      router.pathname.match("/auth/login") ||
      router.pathname.match("/auth/login/extension"),
    [router.pathname]
  );

  const hasWrapper = useMemo(
    () => needVocabularyLayout.includes(router.pathname),
    [router.pathname]
  );

  return (
    <HTML>
      {isNotLayout ? (
        <Component {...pageProps} />
      ) : (
        <AuthLayout
          {...pageProps}
          layout={hasWrapper ? VocabularyLayout : null}
          component={Component}
        ></AuthLayout>
      )}
    </HTML>
  );
}
