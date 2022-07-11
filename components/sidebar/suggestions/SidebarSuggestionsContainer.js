const SidebarSuggestionsContainer = ({ children, className, ...props }) => {
  return (
    <section className={`flex flex-col ${className}`} {...props}>
      {children}
    </section>
  );
};

export default SidebarSuggestionsContainer;
