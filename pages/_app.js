import { useState } from "react";
import Head from "next/head";
import "../styles/globals.css";
import LoginPending from "../components/LoginPending";
import useAuthListener from "../hooks/useAuth";
import UserContext from "../context/UserContext";
import NextNprogress from "nextjs-progressbar";
import ViewportProvider from "../context/ViewportContext";

export default function MyApp({ Component, pageProps }) {
  const { setUser, user, pending, loggedIn } = useAuthListener();
  const [photos, setPhotos] = useState([]);

  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewportProvider>
        <UserContext.Provider
          value={{ setUser, setPhotos, photos, user, pending, loggedIn }}
        >
          <NextNprogress options={{ showSpinner: false }} />
          {pending ? <LoginPending /> : <Component {...pageProps} />}
        </UserContext.Provider>
      </ViewportProvider>
    </>
  );
}
