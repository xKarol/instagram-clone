import clsx from "clsx";

const SidebarText = ({ children, className, ...props }) => {
  return (
    <p className={clsx("font-medium", className)} {...props}>
      {children}
    </p>
  );
};

export default SidebarText;
