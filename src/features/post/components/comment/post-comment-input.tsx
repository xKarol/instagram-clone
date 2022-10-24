import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"input">;

const PostCommentInput = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx("flex-1 text-[14px] relative", className)}>
      {children}
      <input
        className="w-full outline-none"
        type="text"
        placeholder="Add a comment..."
        {...props}
      />
    </div>
  );
};

export default PostCommentInput;
