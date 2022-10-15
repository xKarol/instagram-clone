import clsx from "clsx";

const AuthContainer = ({ children, className, ...props }) => {
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
