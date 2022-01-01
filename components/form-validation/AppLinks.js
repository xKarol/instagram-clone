import Image from "next/image";
import AppStore from "../../assets/images/appstore.png";
import GooglePlay from "../../assets/images/googleplay.png";

export default function AppLinks() {
  return (
    <>
      <span className="text-[14px] my-[15px]">Get the app.</span>
      <div className="flex gap-[5px]">
        <Image
          src={AppStore}
          alt="Download on the App Store"
          height={40}
          width={130}
          objectFit="contain"
        />
        <Image
          src={GooglePlay}
          alt="Download on the Google Play"
          height={40}
          width={130}
          objectFit="contain"
        />
      </div>
    </>
  );
}
