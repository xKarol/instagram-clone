import Head from "next/head";
import Link from "next/link";
import { ROUTE_HOME } from "../constants/routes";
import { HeaderContainer } from "../features/header/containers";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found • Instagram</title>
      </Head>
      <HeaderContainer />
      <section className="flex flex-col items-center justify-center mt-[100px] space-y-[20px] text-center px-[50px]">
        <h1 className="font-medium text-[22px]">
          Sorry, this page isn&apos;t available.
        </h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed. &nbsp;
          <Link href={ROUTE_HOME}>
            <a className="text-blue">Go back to Instagram.</a>
          </Link>
        </p>
      </section>
    </>
  );
};

export default NotFoundPage;
