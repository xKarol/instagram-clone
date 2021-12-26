import Image from "next/image";
import DefaultAvatar from "../assets/images/default-avatar.jpg";

export default function Avatar({ src, size = 40, className }) {
  console.log(size);
  return (
    <div
      className={`bg-gray-300 rounded-[50%] flex items-center justify-center overflow-hidden ${className}`}
    >
      <Image
        src={src ? src : DefaultAvatar}
        objectFit="contain"
        width={size}
        height={size}
        alt="avatar"
      />
    </div>
  );
}
