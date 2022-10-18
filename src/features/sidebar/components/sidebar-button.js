import clsx from "clsx";

const SidebarButton = ({ children, className, ...props }) => {
  return (
    <button className={clsx("font-medium text-[12px]", className)} {...props}>
      {children}
    </button>
  );
};

export default SidebarButton;
