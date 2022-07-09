const PostBody = ({ children, className, ...props }) => {
  return (
    <section className={`w-full flex flex-col ${className}`} {...props}>
      {children}
    </section>
  );
};

export default PostBody;
