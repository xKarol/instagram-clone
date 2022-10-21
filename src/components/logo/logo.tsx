import Link from "next/link";
import clsx from "clsx";
import InstagramLogoSVG from "../../assets/svg/instagram-logo.svg";
import { ROUTE_HOME } from "../../constants/routes";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  href?: string;
};

const Logo = ({ className, href = ROUTE_HOME, ...props }: Props) => {
  const isHref = href.length > 0;
  return (
    <Link href={href}>
      <a
        className={clsx(
          "w-[100px] flex items-center",
          className,
          isHref && "cursor-pointer"
        )}
        {...props}
      >
        <InstagramLogoSVG />
      </a>
    </Link>
  );
};

export default Logo;
