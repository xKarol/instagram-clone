import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import AuthAppsContainer from "./auth-apps";
import {
  AuthBox,
  AuthContainer,
  AuthError,
  AuthFacebookLoginProvider,
  AuthInputField,
  AuthPhoneGallery,
  AuthSubmitButton,
} from "../../components/auth";
import { Divider } from "../../components/divider";
import LoadingScreen from "../../components/loading-screen";
import Logo from "../../components/logo";
import { auth, db } from "../../config/firebase.config";
import { ROUTE_SIGN_UP } from "../../constants/routes";
import useRedirectLoggedUser from "../../hooks/use-redirect-logged-user";
import { signInSchema } from "../../schemas";
import { getUserByUsername } from "../../services";
import { getAuthErrorMessage } from "../../utils";

const AuthSignInContainer = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const loggedIn = useRedirectLoggedUser("/");
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const watchAll = watch();

  useEffect(() => {
    const isValidForm = () => {
      signInSchema.isValid(watchAll).then((valid) => setIsDisabled(!valid));
    };
    isValidForm();
  }, [watchAll]);

  const onSubmit = async (data) => {
    try {
      if (isDisabled) return;
      const { login, password } = data;
      setLoading(true);
      if (isEmail(login)) {
        return await signInWithEmailAndPassword(auth, login, password); //email login
      }
      const { email } = (await getUserByUsername(db, login, false)) ?? {};
      if (!email) throw "Invalid username or email.";
      await signInWithEmailAndPassword(auth, email, password); //username login
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? getAuthErrorMessage(error.code)
          : error;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) return <LoadingScreen />;
  return (
    <section className="flex justify-center items-center p-[50px] gap-[25px]">
      <AuthPhoneGallery />
      <AuthContainer data-testid="login-box">
        <AuthBox>
          <Logo size={200} className="mb-[20px]" />
          <form
            className="w-full flex flex-col gap-[5px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInputField
              placeholder="Username or email"
              data-testid="login-username-input"
              {...register("login")}
            />
            <AuthInputField
              type="password"
              placeholder="Password"
              data-testid="login-password-input"
              {...register("password")}
            />
            <AuthSubmitButton disabled={isDisabled} isLoading={loading}>
              Log In
            </AuthSubmitButton>
          </form>
          <Divider>Or</Divider>
          <AuthFacebookLoginProvider variant="outlined" />
          <AuthError>{error}</AuthError>
          <a href="" className="text-[12px] text-[#385185] mt-[10px]">
            Forgot password?
          </a>
        </AuthBox>
        <AuthBox className="mt-[10px]">
          <span className="text-[14px] text-center">
            Don&apos;t have an account?&nbsp;
            <Link href={ROUTE_SIGN_UP}>
              <a className="text-blue font-medium">Sign Up</a>
            </Link>
          </span>
        </AuthBox>
        <span className="text-red font-medium text-sm mt-5">
          This is FAKE Instagram
        </span>
        <AuthAppsContainer />
      </AuthContainer>
    </section>
  );
};

export default AuthSignInContainer;
