const SidebarHeading = ({ children, className, ...props }) => {
  return (
    <h1
      className={`font-medium text-gray-300 text-[14px] ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
};

export default SidebarHeading;
