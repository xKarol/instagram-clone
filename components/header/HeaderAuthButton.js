import Link from "next/link";
import clsx from "clsx";

const HeaderAuth = ({
  children,
  href,
  variant = "outlined",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx("mr-[10px] sm:mr-[20px] last-of-type:mr-0", className)}
      {...props}
    >
      <Link href={href}>
        <a
          className={
            variant === "text"
              ? "bg-transparent text-blue text-[14px] font-medium"
              : "bg-blue text-white rounded-[5px] text-[14px] font-medium px-[12px] py-[4px]"
          }
        >
          {children}
        </a>
      </Link>
    </button>
  );
};

export default HeaderAuth;
