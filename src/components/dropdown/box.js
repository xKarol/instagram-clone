import clsx from "clsx";

const Box = ({ children, className }) => {
  return (
    <ul
      className={clsx(
        "relative bg-white text-[14px] rounded-md before:shadow-[0_0_5px_1px_rgba(0,0,0,0.05)] before:absolute before:right-[32px] before:-top-[5px] before:bg-white before:w-[15px] before:h-[15px] before:rotate-45 before:z-[-1]",
        className
      )}
    >
      {children}
    </ul>
  );
};

export default Box;
