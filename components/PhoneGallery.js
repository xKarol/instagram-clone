import Image from "next/image";
import Phone from "../assets/images/login-phone.png";

export default function PhoneGallery() {
  return (
    <div className="hidden md:block">
      <Image src={Phone} alt="instagram phone photo" objectFit="contain" />
    </div>
  );
}
