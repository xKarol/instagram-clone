import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/Link";
import AppStore from "../../assets/images/appstore.png";
import GooglePlay from "../../assets/images/googleplay.png";
import Logo from "../../assets/svg/instagram-logo.svg";
import { AiFillFacebook } from "react-icons/ai";
import {
  MIN_PASSWORD,
  MAX_USERNAME,
  MAX_FULL_NAME,
} from "../../constants/validation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordShowBtnRef = useRef(null);

  const disabledBtn =
    !email ||
    !username ||
    !(username.length < MAX_USERNAME) ||
    !fullName ||
    !(fullName.length < MAX_FULL_NAME) ||
    !(password.length >= MIN_PASSWORD);

  const handleRegister = () => {};

  const togglePassword = () => {
    const type =
      passwordRef.current.getAttribute("type") === "password"
        ? "text"
        : "password";
    if (type === "password") {
      passwordShowBtnRef.current.innerText = "Show";
    } else {
      passwordShowBtnRef.current.innerText = "Hide";
    }
    passwordRef.current.setAttribute("type", type);
  };

  return (
    <>
      <div className="flex justify-center items-center p-[50px] gap-[25px]">
        <div className="w-[350px] max-w-[350px] flex flex-col items-center">
          <div className="bg-white border border-gray-200 flex items-center flex-col px-[35px] py-5 w-full">
            <div className="max-w-[200px] mb-[5px]">
              <Image src={Logo} alt="instagram logo" />
            </div>
            <h1 className="font-medium text-gray-300 text-center mb-[15px]">
              Sign up to see photos and videos from your friends.
            </h1>
            <div className="flex w-full items-center justify-center py-[5px] rounded-sm bg-blue text-white font-medium text-[14px]">
              <AiFillFacebook className="text-[20px] text-white mr-[5px]" />
              Log in with Facebook
            </div>
            <div className="flex w-full items-center my-[20px]">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <div className="text-gray-300 mx-[20px] text-[12px] font-bold uppercase">
                OR
              </div>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>
            <form className="w-full flex flex-col gap-[5px]">
              <input
                type="text"
                placeholder="Mobile Number or Email"
                className="formButton w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Full Name"
                className="formButton w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                className="formButton w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="formButton w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={passwordRef}
                />
                <span
                  className={`absolute top-1/2 right-[10px] -translate-y-1/2 text-[14px] font-[600] cursor-pointer ${
                    !password && "hidden"
                  }`}
                  onClick={togglePassword}
                  ref={passwordShowBtnRef}
                >
                  Show
                </span>
              </div>
              <button
                disabled={disabledBtn}
                className="p-[10px] rounded-sm text-[14px] w-full text-white bg-blue mt-[10px] py-[5px] font-medium disabled:opacity-25"
                onClick={handleRegister}
              >
                Sign Up
              </button>
            </form>
            <span className="text-[12px] text-gray-300 text-center my-[20px]">
              By signing up, you agree to our{" "}
              <a href="" className="font-medium">
                Terms
              </a>{" "}
              . Learn how we collect, use and share your data in our{" "}
              <a href="" className="font-medium">
                Data Policy{" "}
              </a>
              and how we use cookies and similar technology in our{" "}
              <a href="" className="font-medium">
                Cookies Policy
              </a>{" "}
              .
            </span>
          </div>
          <div className="bg-white border border-gray-200 flex items-center flex-col p-[20px] w-full mt-[10px]">
            <span className="text-[14px]">
              Have an account?{" "}
              <Link href="/login">
                <a className="text-blue font-medium">Log In</a>
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
