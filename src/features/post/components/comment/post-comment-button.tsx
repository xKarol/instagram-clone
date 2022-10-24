import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"button">;

const PostCommentButton = ({ children, className, ...props }: Props) => {
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
