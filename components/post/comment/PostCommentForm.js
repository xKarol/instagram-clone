const PostCommentForm = ({
  pending = false,
  children,
  className,
  ...props
}) => {
  return (
    <form
      className={`w-full flex items-center flex-1 px-[16px] py-[12px] 
      border border-transparent border-t-gray-200 ${!!pending && "opacity-50"}`}
      {...props}
    >
      {children}
    </form>
  );
};

export default PostCommentForm;
