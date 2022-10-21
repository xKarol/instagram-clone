import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"section">;

const SidebarSuggestionsContainer = ({
  children,
  className,
  ...props
}: Props) => {
  return (
    <section className={clsx("flex flex-col", className)} {...props}>
      {children}
    </section>
  );
};

export default SidebarSuggestionsContainer;
