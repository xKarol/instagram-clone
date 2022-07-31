import Head from "next/head";
import "../styles/globals.css";
import LoginPending from "../components/LoginPending";
import NextNprogress from "nextjs-progressbar";
import ViewportProvider from "../context/ViewportContext";
import UserProvider, { UserContext } from "../context/UserContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewportProvider>
        <UserProvider>
          <NextNprogress options={{ showSpinner: false }} />
          <UserContext.Consumer>
            {({ pending }) =>
              pending ? <LoginPending /> : <Component {...pageProps} />
            }
          </UserContext.Consumer>
        </UserProvider>
      </ViewportProvider>
    </>
  );
}
