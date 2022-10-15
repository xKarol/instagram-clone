import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/loading-screen";
import Link from "next/link";
import Logo from "../../components/logo";
import { signUpUser, getUserByUsername } from "../../services";
import useRedirectLoggedUser from "../../hooks/useRedirectLoggedUser";
import {
  Container,
  InputField,
  Error,
  SubmitButton,
  Box,
  FacebookLoginProvider,
} from "../../components/auth";
import { db } from "../../config/firebase.config";
import { getAuthErrorMessage } from "../../utils";
import { ROUTE_SIGN_IN } from "../../constants/routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../schemas";
import AuthAppsContainer from "./auth-apps";
import { Divider } from "../../components/divider";

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
      <Container data-testid="register-box">
        <Box>
          <Logo size={200} className="mb-[20px]" />
          <h1 className="font-medium text-gray-300 text-center mb-[15px]">
            Sign up to see photos and videos from your friends.
          </h1>
          <FacebookLoginProvider variant="filled" />
          <Divider>Or</Divider>
          <form
            className="w-full flex flex-col gap-[5px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              type="email"
              placeholder="Email"
              data-testid="register-email-input"
              {...register("email")}
            />
            <InputField
              type="text"
              placeholder="Full Name"
              data-testid="register-fullname-input"
              {...register("fullName")}
            />
            <InputField
              type="text"
              placeholder="Username"
              data-testid="register-username-input"
              {...register("username")}
            />
            <InputField
              type="password"
              placeholder="Password"
              className="formButton w-full"
              data-testid="register-password-input"
              {...register("password")}
            />
            <SubmitButton disabled={isDisabled} isLoading={loading}>
              Sign Up
            </SubmitButton>
            <Error error={error} />
          </form>
          <span className="text-red font-medium text-sm mt-5">
            This is FAKE Instagram
          </span>
        </Box>
        <Box className="mt-[10px]">
          <span className="text-[14px] text-center">
            Have an account?&nbsp;
            <Link href={ROUTE_SIGN_IN}>
              <a className="text-blue font-medium">Log In</a>
            </Link>
          </span>
        </Box>
        <AuthAppsContainer />
      </Container>
    </section>
  );
};

export default AuthSignUpContainer;
