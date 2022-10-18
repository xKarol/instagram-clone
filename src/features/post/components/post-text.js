import clsx from "clsx";

const PostText = ({ children, className, ...props }) => {
  return (
    <p className={clsx("text-[14px] font-medium", className)} {...props}>
      {children}
    </p>
  );
};

export default PostText;
