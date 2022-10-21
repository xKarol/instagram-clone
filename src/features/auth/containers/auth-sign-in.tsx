import Link from "next/link";
import AuthAppsContainer from "./auth-apps";
import {
  AuthBox,
  AuthContainer,
  AuthError,
  AuthFacebookLoginProvider,
  AuthInputField,
  AuthPhoneGallery,
  AuthSubmitButton,
} from "../components";
import { Divider } from "../../../components/divider";
import { LoadingScreen } from "../../../components/loading-screen";
import { Logo } from "../../../components/logo";
import { ROUTE_SIGN_UP } from "../../../constants/routes";
import useRedirectLoggedUser from "../../../hooks/use-redirect-logged-user";
import { useSignIn } from "../hooks";

const AuthSignInContainer = () => {
  const loggedIn = useRedirectLoggedUser("/");
  const { error, handleSubmit, isValid, isLoading, onSubmit, register } =
    useSignIn();

  if (loggedIn) return <LoadingScreen />;
  return (
    <section className="flex justify-center items-center p-[50px] gap-[25px]">
      <AuthPhoneGallery />
      <AuthContainer data-testid="login-box">
        <AuthBox>
          <Logo className="mb-[20px]" />
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
            <AuthSubmitButton disabled={!isValid} isLoading={isLoading}>
              Log In
            </AuthSubmitButton>
          </form>
          <Divider>Or</Divider>
          <AuthFacebookLoginProvider variant="outlined" />
          <AuthError>{error}</AuthError>
          <Link href="#">
            <a className="text-[12px] text-[#385185] mt-[10px]">
              Forgot password?
            </a>
          </Link>
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
