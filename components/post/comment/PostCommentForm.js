import clsx from "clsx";

const PostCommentForm = ({
  pending = false,
  children,
  className,
  ...props
}) => {
  return (
    <form
      className={clsx(
        "flex items-center px-[16px] py-[12px] border border-transparent border-t-gray-200",
        pending && "opacity-50"
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export default PostCommentForm;
