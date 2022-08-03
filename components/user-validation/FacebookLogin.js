import { AiFillFacebook } from "react-icons/ai";
import clsx from "clsx";

const FacebookLogin = ({ className }) => {
  return (
    <button
      aria-label="log in with facebook"
      className={clsx(
        "flex items-center justify-center font-medium text-[14px] py-[5px] rounded-sm cursor-pointer",
        className
      )}
    >
      <AiFillFacebook className="text-[20px] mr-[5px]" />
      Log in with Facebook
    </button>
  );
};

export default FacebookLogin;
