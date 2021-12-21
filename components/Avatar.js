import Image from "next/image";
import React from "react";
import DefaultAvatar from "../assets/images/default-avatar.png";

export default function Avatar({ src, size }) {
  return (
    <div
      className={`bg-gray-300 w-[${size}px] h-[${size}px] rounded-[50%] flex items-center justify-center object-cover overflow-hidden`}
    >
      <Image src={src ? src : DefaultAvatar} alt="avatar" />
    </div>
  );
}
