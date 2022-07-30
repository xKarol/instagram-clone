import clsx from "clsx";

const PostUploadBox = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "h-[400px] relative transition-all ease-in-out delay-300",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default PostUploadBox;
