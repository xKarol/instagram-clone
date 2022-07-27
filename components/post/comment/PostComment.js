import clsx from "clsx";

const PostComment = ({ children, className, ...props }) => {
  return (
    <li className={clsx("w-full flex items-center", className)} {...props}>
      {children}
    </li>
  );
};

export default PostComment;
