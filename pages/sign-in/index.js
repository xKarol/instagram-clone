import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase.config";
import { MIN_PASSWORD } from "../../constants/validation";
import { getUserByUsername } from "../../services";
import useRedirectLoggedUser from "../../hooks/useRedirectLoggedUser";
import LoadingScreen from "../../components/loading-screen";
import {
  Container,
  Error,
  Submit,
  InputField,
  FacebookLogin,
  Separator,
  Box,
  AppLinks,
  PhoneGallery,
} from "../../components/user-validation";
import isEmail from "validator/lib/isEmail";
import { getAuthErrorMessage } from "../../utils";

const SignInPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loggedIn = useRedirectLoggedUser("/");
  const disabledBtn = !login.length || !(password.length >= MIN_PASSWORD);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (disabledBtn) return;
    try {
      setLoading(true);
      if (isEmail(login)) {
        //email login
        await signInWithEmailAndPassword(auth, login, password);
      } else {
        //username login
        const { email } = await getUserByUsername(db, login, false);
        if (email) {
          await signInWithEmailAndPassword(auth, email, password);
        }
      }
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>Login • Instagram</title>
      </Head>
      <section className="flex justify-center items-center p-[50px] gap-[25px]">
        <PhoneGallery />
        <Container data-cy="login-box">
          <Box>
            <Logo size={200} className="mb-[20px]" />
            <form
              className="w-full flex flex-col gap-[5px]"
              onSubmit={(e) => handleLogin(e)}
            >
              <InputField
                placeholder="Username or email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                data-cy="login-username-input"
              />
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-cy="login-password-input"
              />
              <Submit
                text={"Log In"}
                disabled={disabledBtn}
                pending={loading}
              />
            </form>
            <Separator />
            <FacebookLogin className="text-[#385185] mb-[10px]" />
            <Error error={error} />
            <a href="" className="text-[12px] text-[#385185] mt-[10px]">
              Forgot password?
            </a>
          </Box>
          <Box className="mt-[10px]">
            <span className="text-[14px] text-center">
              Don&apos;t have an account?&nbsp;
              <Link href="/sign-up">
                <a className="text-blue font-medium">Sign Up</a>
              </Link>
            </span>
          </Box>
          <span className="text-red font-medium text-sm mt-5">
            This is FAKE Instagram
          </span>
          <AppLinks />
        </Container>
      </section>
    </>
  );
};

export default SignInPage;
