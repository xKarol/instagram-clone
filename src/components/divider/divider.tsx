import React from "react";
import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"div">;

const Divider = ({ children, className, ...rest }: Props) => {
  const lineClass = clsx("flex-1 h-[1px] bg-gray-200", className);
  return (
    <div {...rest} className="flex w-full items-center my-[20px]">
      <div className={lineClass} />
      {children ? (
        <div className="text-gray-300 mx-[20px] text-[12px] font-bold uppercase">
          {children}
        </div>
      ) : null}
      <div className={lineClass} />
    </div>
  );
};

export default Divider;
