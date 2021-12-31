import Image from "next/image";
import DefaultAvatar from "../assets/images/default-avatar.jpg";

export default function Avatar({ src, className }) {
  return (
    <div
      className={`w-full h-full rounded-[50%] flex items-center justify-center overflow-hidden relative ${className}`}
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
