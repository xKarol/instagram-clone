import Head from "next/head";
import { AuthSignUpContainer } from "../features/auth/containers";

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
