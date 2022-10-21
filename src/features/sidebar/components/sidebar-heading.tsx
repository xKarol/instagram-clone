import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"h1">;

const SidebarHeading = ({ children, className, ...props }: Props) => {
  return (
    <h1
      className={clsx("font-medium text-gray-300 text-[14px]", className)}
      {...props}
    >
      {children}
    </h1>
  );
};

export default SidebarHeading;
