import HeaderContainer from "../containers/header";
import NotFound from "../components/not-found";
import Head from "next/head";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found • Instagram</title>
      </Head>
      <HeaderContainer />
      <NotFound />
    </>
  );
};

export default NotFoundPage;
