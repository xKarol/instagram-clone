import Head from "next/head";
import { AuthSignInContainer } from "../features/auth/containers";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Login • Instagram</title>
      </Head>
      <AuthSignInContainer />
    </>
  );
};

export default SignInPage;
