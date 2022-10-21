import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"li">;

const SidebarSuggestionItem = ({ children, className, ...props }: Props) => {
  return (
    <li
      className={clsx(
        "flex items-center text-[14px] gap-[15px] py-[5px]",
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
};

export default SidebarSuggestionItem;
