import clsx from "clsx";

const HeaderAuth = ({ children, className, ...props }) => {
  return (
    <section className={clsx("flex items-center", className)} {...props}>
      {children}
    </section>
  );
};

export default HeaderAuth;
