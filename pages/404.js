import Header from "../components/Header";
import NotFound from "../components/NotFound";
import Head from "next/head";

export default function NotFoundPage() {
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
