import Link from "next/link";
import clsx from "clsx";

const PostUsername = ({ children, className, ...props }) => {
  const username = String(children);
  return (
    <Link href={`/${username}`}>
      <a
        className={clsx("text-[14px] font-medium hover:underline", className)}
        {...props}
      >
        {username}
      </a>
    </Link>
  );
};

export default PostUsername;
