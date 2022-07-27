import clsx from "clsx";

const PostIcon = ({ children, className, ...props }) => {
  return (
    <button className={clsx("cursor-pointer", className)} {...props}>
      {children}
    </button>
  );
};

export default PostIcon;
