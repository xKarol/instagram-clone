import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"div">;

const AuthContainer = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={clsx(
        "w-[350px] max-w-[350px] flex flex-col items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
