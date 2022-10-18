import clsx from "clsx";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      aria-label="modal button"
      onClick={onClick}
      className={clsx(
        "p-[10px] w-full text-[14px] border border-transparent border-t-gray-200 hover:bg-gray-100",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
