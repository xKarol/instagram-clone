import Image from "next/image";
import Link from "next/link";
import InstagramLogo from "../../assets/svg/instagram-logo.svg";
import clsx from "clsx";

const Logo = ({ size = 200, className, href = "" }) => {
  return (
    <Link href={`${href.length ? "/" : href}`}>
      <a
        className={clsx(
          "min-w-[200px] flex items-center",
          className,
          !href.length && "outline-none cursor-default"
        )}
        style={{ minWidth: `${size}px` }}
      >
        <Image
          src={InstagramLogo}
          width={size}
          height={50}
          alt="instagram logo"
        />
      </a>
    </Link>
  );
};

export default Logo;
