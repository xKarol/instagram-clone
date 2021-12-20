import Head from "next/head";
import "../styles/globals.css";
import "../config/firebase.config";
import useAuthListener from "../hooks/useAuth";
import UserContext from "../context/UserContext";

export default function MyApp({ Component, pageProps }) {
  const { user } = useAuthListener();
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContext.Provider value={user}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}
