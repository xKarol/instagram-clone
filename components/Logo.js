import Image from "next/image";
import Link from "next/link";
import InstagramLogo from "../assets/svg/instagram-logo.svg";

export default function Logo({ size = 200, className }) {
  return (
    <Link href="/">
      <a className={`min-w-[${size}px] flex items-center ${className}`}>
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
