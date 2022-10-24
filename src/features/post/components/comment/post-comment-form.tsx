import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"form"> & {
  pending: boolean;
};

const PostCommentForm = ({
  pending = false,
  children,
  className,
  ...props
}: Props) => {
  return (
    <form
      className={clsx(
        "flex items-center px-[16px] py-[12px] border border-transparent border-t-gray-200",
        pending && "opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export default PostCommentForm;
