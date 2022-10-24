import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"section">;

const PostUploadBox = ({ children, className, ...props }: Props) => {
  return (
    <section
      className={clsx(
        "h-[400px] relative transition-all ease-in-out delay-300",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default PostUploadBox;
