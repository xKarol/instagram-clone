import Image from "next/image";
import DefaultAvatar from "../assets/images/default-avatar.jpg";

export default function Avatar({ src, size = 40, className }) {
  return (
    <div
      className={`bg-gray-300 rounded-[50%] w-[${size}px] h-[${size}px] flex items-center justify-center overflow-hidden relative ${className}`}
    >
      <Image
        src={src ? src : DefaultAvatar}
        objectFit="contain"
        layout="fill"
        alt="avatar"
      />
    </div>
  );
}
