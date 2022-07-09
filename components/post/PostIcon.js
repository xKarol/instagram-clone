const PostIcon = ({ children, className, ...props }) => {
  return (
    <button className={`cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
};

export default PostIcon;
