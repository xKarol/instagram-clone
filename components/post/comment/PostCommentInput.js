const PostCommentInput = ({ children, className, ...props }) => {
  return (
    <div className={`flex-1 text-[14px] relative ${className}`}>
      {children}
      <input
        className="w-full outline-none"
        type="text"
        placeholder="Add a comment..."
        {...props}
      />
    </div>
  );
};

export default PostCommentInput;
