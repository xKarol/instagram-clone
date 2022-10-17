import clsx from "clsx";

const PostBody = ({ children, className, ...props }) => {
  return (
    <section className={clsx("w-full flex flex-col", className)} {...props}>
      {children}
    </section>
  );
};

export default PostBody;
