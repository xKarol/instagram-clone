import Image from "next/image";
import clsx from "clsx";

const PostImage = ({ children, src, alt, className, ...props }) => {
  return (
    <div className={clsx("relative w-full pb-[125%] bg-gray-100", className)}>
      {children}
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        priority
        {...props}
      />
    </div>
  );
};

export default PostImage;
