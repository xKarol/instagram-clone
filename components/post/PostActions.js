const PostActions = ({ children, className, ...props }) => {
  return (
    <section
      className={`w-full h-[50px] flex gap-[15px] text-[25px] items-center ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default PostActions;
