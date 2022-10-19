import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import "../styles/globals.css";
import ViewportProvider from "../context/viewport-context";
import UserProvider, { UserContext } from "../context/user-context";
import LoadingScreen from "../components/loading-screen";
import PostsProvider from "../context/posts-context";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewportProvider>
        <PostsProvider>
          <UserProvider>
            <UserContext.Consumer>
              {({ pending }) =>
                pending ? <LoadingScreen /> : <Component {...pageProps} />
              }
            </UserContext.Consumer>
          </UserProvider>
        </PostsProvider>
      </ViewportProvider>
    </>
  );
}
