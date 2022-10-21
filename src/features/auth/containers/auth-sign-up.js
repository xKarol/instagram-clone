import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthAppsContainer from "./auth-apps";
import {
  AuthBox,
  AuthContainer,
  AuthError,
  AuthFacebookLoginProvider,
  AuthInputField,
  AuthSubmitButton,
} from "../components";
import { Divider } from "../../../components/divider";
import { LoadingScreen } from "../../../components/loading-screen";
import { Logo } from "../../../components/logo";
import { db } from "../../../config/firebase.config";
import { ROUTE_SIGN_IN } from "../../../constants/routes";
import useRedirectLoggedUser from "../../../hooks/use-redirect-logged-user";
import { signUpSchema } from "../schemas";
import { getUserByUsername, signUpUser } from "../../../services";
import { getAuthErrorMessage } from "../../../utils";

const AuthSignUpContainer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const loggedIn = useRedirectLoggedUser("/");
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const watchAll = watch();

  useEffect(() => {
    const isValidForm = () => {
      signUpSchema.isValid(watchAll).then((valid) => setIsDisabled(!valid));
    };
    isValidForm();
  }, [watchAll]);

  const onSubmit = async (data) => {
    try {
      if (isDisabled) return;
      const { email, fullName, username, password } = data;
      setLoading(true);
      const usernameInUse = await getUserByUsername(db, username, false);
      if (usernameInUse) {
        return setError("Username already in use.");
      }
      await signUpUser({ db, username, fullName, email, password });
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) return <LoadingScreen />;
  return (
    <section className="flex justify-center items-center p-[50px]">
      <AuthContainer data-testid="register-box">
        <AuthBox>
          <Logo className="mb-[20px]" />
          <h1 className="font-medium text-gray-300 text-center mb-[15px]">
            Sign up to see photos and videos from your friends.
          </h1>
          <AuthFacebookLoginProvider variant="filled" />
          <Divider>Or</Divider>
          <form
            className="w-full flex flex-col gap-[5px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInputField
              type="email"
              placeholder="Email"
              data-testid="register-email-input"
              {...register("email")}
            />
            <AuthInputField
              type="text"
              placeholder="Full Name"
              data-testid="register-fullname-input"
              {...register("fullName")}
            />
            <AuthInputField
              type="text"
              placeholder="Username"
              data-testid="register-username-input"
              {...register("username")}
            />
            <AuthInputField
              type="password"
              placeholder="Password"
              className="formButton w-full"
              data-testid="register-password-input"
              {...register("password")}
            />
            <AuthSubmitButton disabled={isDisabled} isLoading={loading}>
              Sign Up
            </AuthSubmitButton>
            <AuthError>{error}</AuthError>
          </form>
          <span className="text-red font-medium text-sm mt-5">
            This is FAKE Instagram
          </span>
        </AuthBox>
        <AuthBox className="mt-[10px]">
          <span className="text-[14px] text-center">
            Have an account?&nbsp;
            <Link href={ROUTE_SIGN_IN}>
              <a className="text-blue font-medium">Log In</a>
            </Link>
          </span>
        </AuthBox>
        <AuthAppsContainer />
      </AuthContainer>
    </section>
  );
};

export default AuthSignUpContainer;
