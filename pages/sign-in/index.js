import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";
import PhoneGallery from "../../components/PhoneGallery";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { MIN_PASSWORD } from "../../constants/validation";
import { useRouter } from "next/router";
import { isValidEmail } from "../../services/utils";
import { getUserByUsername } from "../../services/firebase";
import useRedirectLoggedUser from "../../hooks/useRedirectLoggedUser";
import LoginPending from "../../components/LoginPending";
import Error from "../../components/form-validation/Error";
import Submit from "../../components/form-validation/Submit";
import InputField from "../../components/form-validation/InputField";
import FacebookLogin from "../../components/form-validation/FacebookLogin";
import Separator from "../../components/form-validation/Separator";
import Box from "../../components/form-validation/Box";
import AppLinks from "../../components/form-validation/AppLinks";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const disabledBtn = !login || !(password.length >= MIN_PASSWORD);
  const loggedIn = useRedirectLoggedUser("/");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (disabledBtn) return;
    try {
      setLoading(true);
      if (isValidEmail(login)) {
        //email login
        await signInWithEmailAndPassword(auth, login, password);
      } else {
        //username login
        const { email } = await getUserByUsername(login, false);
        if (email) {
          await signInWithEmailAndPassword(auth, email, password);
        }
      }
      router.push("/");
    } catch (error) {
      console.log(error.message);
      const errorMessages = {
        "auth/user-not-found": "User not found.",
        "auth/invalid-email": "Invalid Email.",
        "auth/wrong-password": "Invalid Password.",
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
        <title>Login • Instagram</title>
      </Head>
      <section className="flex justify-center items-center p-[50px] gap-[25px]">
        <PhoneGallery />
        <div className="w-[350px] max-w-[350px] flex flex-col items-center">
          <Box>
            <Logo size={200} className="mb-[20px]" link={false} />
            <form
              className="w-full flex flex-col gap-[5px]"
              onSubmit={(e) => handleLogin(e)}
            >
              <InputField
                placeholder="Username or email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>
      </section>
    </>
  );
}
