import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"main">;

const Layout = ({ children, className }: Props) => {
  return (
    <main
      className={clsx("max-w-[975px] mx-auto mt-[90px] pb-[50px]", className)}
    >
      {children}
    </main>
  );
};

export default Layout;
