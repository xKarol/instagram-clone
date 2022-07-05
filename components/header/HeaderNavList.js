const HeaderNavList = ({ children, className, ...props }) => {
  return (
    <nav className={`flex items-center ${className}`} {...props}>
      <ul className="flex">{children}</ul>
    </nav>
  );
};

export default HeaderNavList;
