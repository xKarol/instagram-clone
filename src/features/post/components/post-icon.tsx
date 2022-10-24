import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"button">;

const PostIcon = ({ children, className, ...props }: Props) => {
  return (
    <button className={clsx("cursor-pointer", className)} {...props}>
      {children}
    </button>
  );
};

export default PostIcon;
