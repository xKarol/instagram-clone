const SidebarButton = ({ children, className, ...props }) => {
  return (
    <button className={`font-medium text-[12px] ${className}`} {...props}>
      {children}
    </button>
  );
};

export default SidebarButton;
