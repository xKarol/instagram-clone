import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"header">;

const HeaderContainer = ({ children, className, ...props }: Props) => {
  return (
    <header
      className={clsx(
        "h-[60px] flex justify-between items-center border-b border-b-gray-200 bg-white fixed z-50 top-0 left-0 right-0",
        className
      )}
      {...props}
    >
      <div className="w-full h-full px-[20px] 1000px:px-0 max-w-[975px] mx-auto flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};

export default HeaderContainer;
