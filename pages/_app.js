import Head from "next/head";
import "../styles/globals.css";
import LoginPending from "../components/LoginPending";
import useAuthListener from "../hooks/useAuth";
import UserContext from "../context/UserContext";
import NextNprogress from "nextjs-progressbar";

export default function MyApp({ Component, pageProps }) {
  const { setUser, user, pending, loggedIn } = useAuthListener();

  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContext.Provider value={{ setUser, user, pending, loggedIn }}>
        <NextNprogress options={{ showSpinner: false }} />
        {pending ? <LoginPending /> : <Component {...pageProps} />}
      </UserContext.Provider>
    </>
  );
}
