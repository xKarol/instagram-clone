import Link from "next/link";
import clsx from "clsx";

type Prop = Omit<React.ComponentPropsWithoutRef<"a">, "children"> & {
  children?: string;
};

const PostUsername = ({ children: username, className, ...props }: Prop) => {
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
