import Image from "next/image";
import Link from "next/Link";
import Phone from "../../assets/images/login-phone.png";
import AppStore from "../../assets/images/appstore.png";
import GooglePlay from "../../assets/images/googleplay.png";
import Logo from "../../assets/svg/instagram-logo.svg";
import { AiFillFacebook } from "react-icons/ai";

export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center p-[50px] gap-5">
        <Image
          src={Phone}
          alt="instagram phone photo"
          className="object-contain"
        />
        <div className="w-[350px] max-w-[350px] flex flex-col items-center">
          <div className="bg-[#ffffff] border border-gray-200 flex items-center flex-col px-[35px] py-5 w-full">
            <div className="max-w-[200px] mb-[20px]">
              <Image src={Logo} alt="instagram logo" />
            </div>
            <form className="w-full flex flex-col gap-[5px]">
              <input
                type="text"
                placeholder="Phone number, username or email"
                className="formButton w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="formButton w-full"
              />
              <button
                disabled={true}
                className="p-2 rounded-sm text-[12px] w-full text-[#fff] bg-blue mt-[10px] py-[5px] font-medium disabled:opacity-25"
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
          <div className="bg-[#ffffff] border border-gray-200 flex items-center flex-col p-[20px] w-full mt-[10px]">
            <span className="text-[14px]">
              Don&apos;t have an account?{" "}
              <Link href="">
                <span className="text-blue font-medium">Sign Up</span>
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
