import Link from "next/link";
import clsx from "clsx";

const HeaderNavLink = ({ children, href, className, ...props }) => {
  return (
    <li
      className={clsx(
        "text-[23px] shrink-0 mr-[10px] sm:mr-[20px] last-of-type:mr-0 cursor-pointer",
        className
      )}
      {...props}
    >
      {href?.length ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        children
      )}
    </li>
  );
};

export default HeaderNavLink;
