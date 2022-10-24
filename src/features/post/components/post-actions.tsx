import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"section">;

const PostActions = ({ children, className, ...props }: Props) => {
  return (
    <section
      className={clsx(
        "w-full h-[50px] flex gap-[15px] text-[25px] items-center",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default PostActions;
