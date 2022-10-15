import Head from "next/head";
import { AuthSignUpContainer } from "../../containers/auth";

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up • Instagram</title>
      </Head>
      <AuthSignUpContainer />
    </>
  );
};

export default SignUpPage;
