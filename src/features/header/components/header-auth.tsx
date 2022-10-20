import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"section">;

const HeaderAuth = ({ children, className, ...props }: Props) => {
  return (
    <section className={clsx("flex items-center", className)} {...props}>
      {children}
    </section>
  );
};

export default HeaderAuth;
