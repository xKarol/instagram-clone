import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import InstagramLogo from "../assets/svg/instagram-logo.svg";

export default function Logo({ size = 200, className, link = true }) {
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    logoRef.current.style.minWidth = `${size}px`;
  }, [size]);

  return (
    <Link href={`${link ? "/" : ""}`}>
      <a
        className={`min-w-[200px] flex items-center ${className} ${
          !link && "outline-none cursor-default"
        }`}
        ref={logoRef}
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
