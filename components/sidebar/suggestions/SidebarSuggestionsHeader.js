import clsx from "clsx";

const SidebarSuggestionsHeader = ({ children, className, ...props }) => {
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
