import Image from "next/image";
import Phone from "../assets/images/login-phone.png";

export default function PhoneGallery() {
  return (
    <>
      <Image
        src={Phone}
        alt="instagram phone photo"
        className="object-contain"
      />
    </>
  );
}
