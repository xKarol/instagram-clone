import Head from "next/head";
import { AuthSignInContainer } from "../../containers/auth";

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
