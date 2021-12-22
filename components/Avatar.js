import Image from "next/image";
import DefaultAvatar from "../assets/images/default-avatar.jpg";

export default function Avatar({ src, size, className }) {
  return (
    <div
      className={`bg-gray-300 w-[${size}px] h-[${size}px] w-[${size}px] h-[${size}px] rounded-[50%] flex items-center justify-center object-cover overflow-hidden ${className}`}
    >
      <Image
        src={src ? src : DefaultAvatar}
        width={size}
        height={size}
        alt="avatar"
      />
    </div>
  );
}
