const PostComment = ({ children, className, ...props }) => {
  return (
    <li className={`w-full flex items-center ${className}`} {...props}>
      {children}
    </li>
  );
};

export default PostComment;
