import Head from "next/head";
import "../styles/globals.css";
import LoginPending from "../components/LoginPending";
import useAuthListener from "../hooks/useAuth";
import UserContext from "../context/UserContext";

export default function MyApp({ Component, pageProps }) {
  const { setUser, user } = useAuthListener();

  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContext.Provider value={(setUser, user)}>
        {user?.pending ? <LoginPending /> : <Component {...pageProps} />}
      </UserContext.Provider>
    </>
  );
}
