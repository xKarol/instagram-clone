import clsx from "clsx";

const SidebarHeading = ({ children, className, ...props }) => {
  return (
    <h1
      className={clsx("font-medium text-gray-300 text-[14px]", className)}
      {...props}
    >
      {children}
    </h1>
  );
};

export default SidebarHeading;
