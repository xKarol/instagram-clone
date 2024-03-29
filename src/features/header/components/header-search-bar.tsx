import { BiSearch } from "react-icons/bi";
import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  placeholder?: string;
};

const HeaderSearchBar = ({
  placeholder = "Search",
  className,
  ...props
}: Props) => {
  return (
    <div
      className={clsx("w-[280px] relative hidden sm:block", className)}
      {...props}
    >
      <BiSearch className="absolute left-[15px] top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none text-[12px]" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-gray-100 py-[17px] pl-[30px] pr-[10px] text-[14px] h-[30px] border border-gray-200 rounded-sm placeholder:text-gray-300"
      />
    </div>
  );
};

export default HeaderSearchBar;
