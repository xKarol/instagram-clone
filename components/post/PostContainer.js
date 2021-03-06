import clsx from "clsx";

const PostContainer = ({ children, className, ...props }) => {
  return (
    <li
      className={clsx(
        "flex flex-col bg-white border border-gray-200 rounded-sm",
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
};

export default PostContainer;
