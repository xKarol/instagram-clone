const PostHeader = ({ children, className, ...props }) => {
  return (
    <header
      className={`flex h-[60px] items-center px-[20px] ${className}`}
      {...props}
    >
      {children}
    </header>
  );
};

export default PostHeader;
