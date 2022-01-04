import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found • Instagram</title>
      </Head>
      <section className="flex flex-col items-center justify-center mt-[100px] space-y-[20px] text-center px-[50px]">
        <h1 className="font-medium text-[22px]">
          Sorry, this page isn&apos;t available.
        </h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed. &nbsp;
          <Link href="/">
            <a className="text-blue">Go back to Instagram.</a>
          </Link>
        </p>
      </section>
    </>
  );
}
