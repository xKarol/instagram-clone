import Image from "next/image";
import React from "react";
import InstagramLogo from "../assets/svg/instagram-logo.svg";

export default function Logo({ size = 200, className }) {
  return (
    <div className={`min-w-[${size}px] flex justify-center ${className}`}>
      <Image src={InstagramLogo} width={size} height={50} alt="instagram logo" />
    </div>
  );
}
