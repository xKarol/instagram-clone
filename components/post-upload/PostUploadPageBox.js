import clsx from "clsx";

const PostUploadBox = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        "h-full w-screen sm:w-[400px] max-w-[400px] mx-auto flex flex-col items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PostUploadBox;
