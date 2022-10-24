import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"button">;

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      aria-label="modal button"
      className={clsx(
        "p-[10px] w-full text-[14px] border border-transparent border-t-gray-200 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
