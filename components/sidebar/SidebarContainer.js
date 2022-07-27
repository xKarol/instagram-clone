const SidebarContainer = ({ children, ...props }) => {
  return (
    <aside
      className="absolute w-[300px] left-[calc(100%_+_10px)] top-0 hidden 1000px:block"
      {...props}
    >
      {children}
    </aside>
  );
};

export default SidebarContainer;
