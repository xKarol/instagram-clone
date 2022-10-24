import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"article">;

const PostContainer = ({ children, className, ...props }: Props) => {
  return (
    <article
      className={clsx(
        "flex flex-col bg-white border border-gray-200 rounded-sm",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
};

export default PostContainer;
