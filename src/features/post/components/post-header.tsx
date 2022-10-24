import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"header">;

const PostHeader = ({ children, className, ...props }: Props) => {
  return (
    <header
      className={clsx("flex h-[60px] items-center px-[20px]", className)}
      {...props}
    >
      {children}
    </header>
  );
};

export default PostHeader;
