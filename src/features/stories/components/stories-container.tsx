import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"section">;

const StoriesContainer = ({ children, className, ...props }: Props) => {
  return (
    <section
      className={clsx(
        "w-full bg-white border border-gray-200 flex flex-col py-[20px] pb-[10px] rounded-sm relative",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default StoriesContainer;
