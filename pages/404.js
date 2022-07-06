import HeaderContainer from "../containers/header";
import NotFound from "../components/NotFound";
import Head from "next/head";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found • Instagram</title>
      </Head>
      <HeaderContainer />
      <NotFound />
    </>
  );
}
