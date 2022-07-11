const SidebarSuggestionItem = ({ children, className, ...props }) => {
  return (
    <li
      className={`flex items-center text-[14px] gap-[15px] py-[5px] ${className}`}
      {...props}
    >
      {children}
    </li>
  );
};

export default SidebarSuggestionItem;
