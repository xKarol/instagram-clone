import clsx from "clsx";
import Image from "next/image";
import DefaultAvatar from "../../assets/images/default-avatar.jpg";

const Avatar = ({ src, size, alt, className, ...props }) => {
  return (
    <figure
      className={clsx(
        "bg-gray-100 w-full h-full rounded-[50%] flex items-center justify-center overflow-hidden relative",
        className
      )}
      {...props}
      style={{ ...props.style, width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src ?? DefaultAvatar}
        objectFit="cover"
        layout="fill"
        alt={alt}
      />
    </figure>
  );
};

export default Avatar;
