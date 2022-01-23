import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppStore from "../../assets/images/appstore.png";
import GooglePlay from "../../assets/images/googleplay.png";
import Logo from "../../components/Logo";
import {
  MIN_PASSWORD,
  MAX_USERNAME,
  MAX_FULL_NAME,
} from "../../constants/validation";
import { signUpUser, getUserByUsername } from "../../services/firebase";
import { useRouter } from "next/router";
import useRedirectLoggedUser from "../../hooks/useRedirectLoggedUser";
import LoginPending from "../../components/LoginPending";
import InputField from "../../components/form-validation/InputField";
import Error from "../../components/form-validation/Error";
import FacebookLogin from "../../components/form-validation/FacebookLogin";
import Submit from "../../components/form-validation/Submit";
import Separator from "../../components/form-validation/Separator";
import Box from "../../components/form-validation/Box";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const loggedIn = useRedirectLoggedUser("/");
  const router = useRouter();

  const disabledBtn =
    !email ||
    !username ||
    !(username.length < MAX_USERNAME) ||
    !fullName ||
    !(fullName.length < MAX_FULL_NAME) ||
    !(password.length >= MIN_PASSWORD);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (disabledBtn) return;
    try {
      setLoading(true);
      const validUsername = await getUserByUsername(username, false);
      if (validUsername) {
        return setError("Username already in use.");
      }
      await signUpUser(username, fullName, email, password);
      router.push("/");
    } catch (error) {
      const errorMessages = {
        "auth/invalid-email": "Invalid Email.",
        "auth/email-already-in-use": "Email already in use.",
      };
      setError(
        errorMessages[error.code]
          ? errorMessages[error.code]
          : "A problem occured."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) return <LoginPending />; // waiting for redirect

  return (
    <>
      <Head>
        <title>Sign Up • Instagram</title>
      </Head>
      <section className="flex justify-center items-center p-[50px] gap-[25px]">
        <div className="w-[350px] max-w-[350px] flex flex-col items-center">
          <Box>
            <Logo size={200} className="mb-[20px]" link={false} />
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
              />
              <InputField
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Password"
                className="formButton w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>
      </section>
    </>
  );
}
