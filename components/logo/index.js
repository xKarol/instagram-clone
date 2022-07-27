import Image from "next/image";
import Link from "next/link";
import InstagramLogo from "../../assets/svg/instagram-logo.svg";
import clsx from "clsx";

export default function Logo({ size = 200, className, link = true }) {
  return (
    <Link href={`${link ? "/" : ""}`}>
      <a
        className={clsx(
          "min-w-[200px] flex items-center",
          className,
          !link && "outline-none cursor-default"
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
}
