const PostContainer = ({ children, className, ...props }) => {
  return (
    <section
      className={`flex flex-col bg-white border border-gray-200 
      rounded-sm mb-[20px] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default PostContainer;
