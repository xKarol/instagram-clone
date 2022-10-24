import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"section">;

const PostBody = ({ children, className, ...props }: Props) => {
  return (
    <section className={clsx("w-full flex flex-col", className)} {...props}>
      {children}
    </section>
  );
};

export default PostBody;
