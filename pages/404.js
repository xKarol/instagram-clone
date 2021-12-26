import Head from "next/head";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

export default function notFound() {
  return (
    <>
      <Head>
        <title>Page Not Found • Instagram</title>
      </Head>
      <Header />
      <NotFound />
    </>
  );
}
