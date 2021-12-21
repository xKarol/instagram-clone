import { useState } from "react";
import Image from "next/image";
import Link from "next/Link";
import AppStore from "../../assets/images/appstore.png";
import GooglePlay from "../../assets/images/googleplay.png";
import Logo from "../../components/Logo";
import { AiFillFacebook } from "react-icons/ai";
import PhoneGallery from "../../components/PhoneGallery";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MIN_PASSWORD } from "../../constants/validation";
import { useRouter } from "next/router";

export default function Login() {
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const disabledBtn = !login || !(password.length >= MIN_PASSWORD);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (disabledBtn) return;
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, login, password);
      router.push("/");
    } catch (error) {
      const errorMessages = {
        "auth/invalid-email": "Invalid Email",
        "auth/wrong-password": "Invalid Password",
      };
      setError(
        errorMessages[error.code]
          ? errorMessages[error.code]
          : "A problem occured"
      );
    }
  };
  return (
    <>
      <div className="flex justify-center items-center p-[50px] gap-[25px]">
        <PhoneGallery />
        <div className="w-[350px] max-w-[350px] flex flex-col items-center">
          <div className="bg-white border border-gray-200 flex items-center flex-col px-[35px] py-5 w-full">
            <Logo size={200} className="mb-[20px]" />
            <form
              className="w-full flex flex-col gap-[5px]"
              onSubmit={(e) => handleLogin(e)}
            >
              <input
                type="text"
                placeholder="Phone number, username or email"
                className="formButton w-full"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="formButton w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={disabledBtn}
                className="p-[10px] rounded-sm text-[14px] w-full text-white bg-blue mt-[10px] py-[5px] font-medium disabled:opacity-25"
              >
                Log In
              </button>
            </form>
            <div className="flex w-full items-center my-[20px]">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <div className="text-gray-300 mx-[20px] text-[12px] font-bold uppercase">
                OR
              </div>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>
            <div className="flex items-center text-[#385185] font-medium text-[14px]">
              <AiFillFacebook className="text-[20px] text-[#385185] mr-[5px]" />
              Log in with Facebook
            </div>
            <a href="" className="text-[12px] text-[#385185] mt-[20px]">
              Forgot password?
            </a>
          </div>
          <div className="bg-white border border-gray-200 flex items-center flex-col p-[20px] w-full mt-[10px]">
            <span className="text-[14px]">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up">
                <a className="text-blue font-medium">Sign Up</a>
              </Link>
            </span>
          </div>
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
      </div>
    </>
  );
}
