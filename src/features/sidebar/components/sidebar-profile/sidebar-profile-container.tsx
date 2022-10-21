import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"section">;

const SidebarProfileContainer = ({ children, className, ...props }: Props) => {
  return (
    <section
      className={clsx(
        "h-[100px] flex items-center gap-[20px] text-[14px]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
export default SidebarProfileContainer;
