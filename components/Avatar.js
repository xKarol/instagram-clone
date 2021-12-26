import Image from "next/image";
import DefaultAvatar from "../assets/images/default-avatar.jpg";

export default function Avatar({ src, size = 40, className }) {
  return (
    <div
      className={`bg-gray-300 w-[${size}px] h-[${size}px] w-[40px] h-[40px] rounded-[50%] flex items-center justify-center overflow-hidden ${className}`}
    >
      <Image
        src={src ? src : DefaultAvatar}
        objectFit="contain"
        alt="avatar"
      />
    </div>
  );
}
