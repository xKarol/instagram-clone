import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"header">;

const SidebarSuggestionsHeader = ({ children, className, ...props }: Props) => {
  return (
    <header
      className={clsx("flex items-center justify-between mb-[5px]", className)}
      {...props}
    >
      {children}
    </header>
  );
};

export default SidebarSuggestionsHeader;
