import { BiChevronRight } from "react-icons/bi";
import clsx from "clsx";

function StoriesArrow({ className, ...props }) {
  return (
    <div
      className={clsx(
        "cursor-pointer flex justify-center items-center text-[20px] z-10 w-[25px] h-[25px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-full absolute top-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      <BiChevronRight />
    </div>
  );
}

export default StoriesArrow;
