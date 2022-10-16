import Head from "next/head";
import HeaderContainer from "../containers/header";
import NotFound from "../components/not-found";

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
