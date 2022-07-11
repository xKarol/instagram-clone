const SidebarText = ({ children, className, ...props }) => {
  return (
    <p className={`font-medium ${className}`} {...props}>
      {children}
    </p>
  );
};

export default SidebarText;
