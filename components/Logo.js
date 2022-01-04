import Image from "next/image";
import Link from "next/link";
import InstagramLogo from "../assets/svg/instagram-logo.svg";

export default function Logo({ size = 200, className, link = true }) {
  return (
    <Link href={`${link ? "/" : ""}`}>
      <a
        className={`min-w-[${size}px] flex items-center ${className} ${
          !link && "outline-none cursor-default"
        }`}
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
