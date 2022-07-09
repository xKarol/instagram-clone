const PostCommentButton = ({ children, className, ...props }) => {
  return (
    <button
      className={`text-blue bg-transparent font-medium text-[14px] cursor-pointer 
      disabled:cursor-default disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PostCommentButton;
