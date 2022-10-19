import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import InstagramLogo from "../../assets/svg/instagram-logo.svg";
import { ROUTE_HOME } from "../../constants/routes";

const Logo = ({ size = 200, className, href = "", ...props }) => {
  const isHref = href.length > 0;
  return (
    <Link href={`${isHref ? ROUTE_HOME : href}`}>
      <a
        className={clsx(
          "min-w-[200px] flex items-center",
          className,
          isHref && "outline-none cursor-default"
        )}
        {...props}
        style={{ ...props.style, minWidth: `${size}px` }}
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