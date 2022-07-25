const PostContainer = ({ children, className, ...props }) => {
  return (
    <li
      className={`flex flex-col bg-white border border-gray-200 
      rounded-sm mb-[20px] ${className}`}
      {...props}
    >
      {children}
    </li>
  );
};

export default PostContainer;
