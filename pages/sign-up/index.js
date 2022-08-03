import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppStore from "../../assets/images/appstore.png";
import GooglePlay from "../../assets/images/googleplay.png";
import Logo from "../../components/logo";
import {
  MIN_PASSWORD,
  MAX_USERNAME,
  MAX_FULL_NAME,
} from "../../constants/validation";
import { signUpUser, getUserByUsername } from "../../services";
import useRedirectLoggedUser from "../../hooks/useRedirectLoggedUser";
import LoadingScreen from "../../components/loading-screen";
import {
  Container,
  InputField,
  Error,
  FacebookLogin,
  Submit,
  Separator,
  Box,
} from "../../components/user-validation";
import { db } from "../../config/firebase.config";
import { getAuthErrorMessage } from "../../utils";
import isEmail from "validator/lib/isEmail";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const loggedIn = useRedirectLoggedUser("/");

  const disabledBtn =
    !email.length ||
    !(username.length < MAX_USERNAME) ||
    !(fullName.length < MAX_FULL_NAME) ||
    !(password.length >= MIN_PASSWORD);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (disabledBtn) return;
    try {
      setLoading(true);
      if (!isEmail(email)) {
        return setError("Email is invalid.");
      }
      const usernameInUse = await getUserByUsername(db, username, false);
      if (usernameInUse) {
        return setError("Username already in use.");
      }
      await signUpUser(db, username, fullName, email, password);
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
        <title>Sign Up • Instagram</title>
      </Head>
      <section className="flex justify-center items-center p-[50px]">
        <Container data-cy="register-box">
          <Box>
            <Logo size={200} className="mb-[20px]" />
            <h1 className="font-medium text-gray-300 text-center mb-[15px]">
              Sign up to see photos and videos from your friends.
            </h1>
            <FacebookLogin className="w-full bg-blue text-white" />
            <Separator />
            <form
              className="w-full flex flex-col gap-[5px]"
              onSubmit={(e) => handleRegister(e)}
            >
              <InputField
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-cy="register-email-input"
              />
              <InputField
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                data-cy="register-fullname-input"
              />
              <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-cy="register-username-input"
              />
              <InputField
                type="password"
                placeholder="Password"
                className="formButton w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-cy="register-password-input"
              />
              <Submit
                text={"Sign Up"}
                disabled={disabledBtn}
                pending={loading}
              />
              <Error error={error} />
            </form>
            <span className="text-red font-medium text-sm mt-5">
              This is FAKE Instagram
            </span>
          </Box>
          <Box className="mt-[10px]">
            <span className="text-[14px] text-center">
              Have an account?{" "}
              <Link href="/sign-in">
                <a className="text-blue font-medium">Log In</a>
              </Link>
            </span>
          </Box>
          <span className="text-[14px] my-[15px]">Get the app.</span>
          <div className="flex gap-[5px]">
            <Image
              src={AppStore}
              alt="Download on the App Store"
              height={40}
              width={130}
            />
            <Image
              src={GooglePlay}
              alt="Download on the Google Play"
              height={40}
              width={130}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignUpPage;
