import Image from "next/image";
import React from "react";
import InstagramLogo from "../assets/svg/instagram-logo.svg";

export default function Logo({ size = 200, className }) {
  console.log(className);
  return (
    <div className={`max-w-[${size}px] flex justify-center ${className}`}>
      <Image src={InstagramLogo} alt="instagram logo" />
    </div>
  );
}
