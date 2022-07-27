import clsx from "clsx";

const SidebarSuggestionsContainer = ({ children, className, ...props }) => {
  return (
    <section className={clsx("flex flex-col", className)} {...props}>
      {children}
    </section>
  );
};

export default SidebarSuggestionsContainer;
