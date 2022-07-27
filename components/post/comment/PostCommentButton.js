import clsx from "clsx";

const PostCommentButton = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "text-blue bg-transparent font-medium text-[14px] cursor-pointer disabled:cursor-default disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PostCommentButton;
