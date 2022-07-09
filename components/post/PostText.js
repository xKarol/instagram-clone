const PostText = ({ children, className, ...props }) => {
  return (
    <p className={`text-[14px] font-medium ${className}`} {...props}>
      {children}
    </p>
  );
};

export default PostText;
