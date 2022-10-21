import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"button">;

const SidebarButton = ({ children, className, ...props }: Props) => {
  return (
    <button className={clsx("font-medium text-[12px]", className)} {...props}>
      {children}
    </button>
  );
};

export default SidebarButton;
