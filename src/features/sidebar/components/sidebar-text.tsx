import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"p">;

const SidebarText = ({ children, className, ...props }: Props) => {
  return (
    <p className={clsx("font-medium", className)} {...props}>
      {children}
    </p>
  );
};

export default SidebarText;
