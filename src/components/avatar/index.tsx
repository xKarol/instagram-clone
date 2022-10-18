import clsx from "clsx";
import Image from "next/image";
import React from "react";
import DefaultAvatar from "../../assets/images/default-avatar.jpg";

type Props = React.ComponentPropsWithoutRef<"figure"> & {
  src: string;
  alt: string;
  size?: number;
};

const Avatar = ({ src, size, alt, className, ...props }: Props) => {
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
