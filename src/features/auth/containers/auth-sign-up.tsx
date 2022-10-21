import Link from "next/link";
import AuthAppsContainer from "./auth-apps";
import { Divider } from "../../../components/divider";
import { LoadingScreen } from "../../../components/loading-screen";
import { Logo } from "../../../components/logo";
import { ROUTE_SIGN_IN } from "../../../constants/routes";
import useRedirectLoggedUser from "../../../hooks/use-redirect-logged-user";
import {
  AuthBox,
  AuthContainer,
  AuthError,
  AuthFacebookLoginProvider,
  AuthInputField,
  AuthSubmitButton,
} from "../components";
import { useSignUp } from "../hooks";

const AuthSignUpContainer = () => {
  const loggedIn = useRedirectLoggedUser("/");
  const { isValid, isLoading, error, register, handleSubmit, onSubmit } =
    useSignUp();

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
            <AuthSubmitButton disabled={!isValid} isLoading={isLoading}>
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
