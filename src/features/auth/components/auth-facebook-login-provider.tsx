import { AiFillFacebook } from "react-icons/ai";
import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"section"> & {
  variant?: "filled" | "outlined";
};

const AuthFacebookLoginProvider = ({
  className,
  variant = "outlined",
  ...rest
}: Props) => {
  return (
    <button
      aria-label="log in with facebook"
      {...rest}
      className={clsx(
        "flex items-center justify-center font-medium text-[14px] py-[5px] rounded-sm cursor-pointer",
        className,
        variant === "filled" && "w-full bg-blue text-white",
        variant === "outlined" && "text-[#385185] mb-[10px]"
      )}
    >
      <AiFillFacebook className="text-[20px] mr-[5px]" />
      Log in with Facebook
    </button>
  );
};

export default AuthFacebookLoginProvider;
