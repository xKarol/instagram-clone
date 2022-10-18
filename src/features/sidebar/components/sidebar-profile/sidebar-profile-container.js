import clsx from "clsx";

const SidebarProfileContainer = ({ children, className, ...props }) => {
  return (
    <article
      className={clsx(
        "h-[100px] flex items-center gap-[20px] text-[14px]",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
};
export default SidebarProfileContainer;
