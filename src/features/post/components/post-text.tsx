import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"p">;

const PostText = ({ children, className, ...props }: Props) => {
  return (
    <p className={clsx("text-[14px] font-medium", className)} {...props}>
      {children}
    </p>
  );
};

export default PostText;
