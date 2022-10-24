import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"li">;

const PostComment = ({ children, className, ...props }: Props) => {
  return (
    <li className={clsx("w-full flex items-center", className)} {...props}>
      {children}
    </li>
  );
};

export default PostComment;
