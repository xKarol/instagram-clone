import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"nav">;

const HeaderNavList = ({ children, className, ...props }: Props) => {
  return (
    <nav className={clsx("flex items-center", className)} {...props}>
      <ul className="flex">{children}</ul>
    </nav>
  );
};

export default HeaderNavList;
