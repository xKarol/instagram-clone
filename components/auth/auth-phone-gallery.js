import clsx from "clsx";
import Image from "next/image";
import Phone from "../../assets/images/login-phone.png";

const AuthPhoneGallery = ({ className, ...rest }) => {
  return (
    <div {...rest} className={clsx("hidden md:block", className)}>
      <Image src={Phone} alt="instagram phone photo" objectFit="contain" />
    </div>
  );
};

export default AuthPhoneGallery;
