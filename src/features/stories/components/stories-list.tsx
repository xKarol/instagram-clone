import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = React.ComponentPropsWithRef<"ul">;

const StoriesList = forwardRef<HTMLUListElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <ul
        className={clsx(
          "w-full flex space-x-[10px] relative overflow-y-scroll scroll-smooth scrollbar-hide px-[20px]",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
StoriesList.displayName = "StoriesList";

export default StoriesList;
