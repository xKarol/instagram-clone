import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import clsx from "clsx";

export default function Button({ children }) {
  const [active, setActive] = useState(false);
  return (
    <button
      className="flex border border-transparent border-t-gray-200 cursor-pointer"
      onClick={() => setActive(!active)}
    >
      <div className="relative w-[calc(100%-15px)] mx-auto flex">
        <p className="w-full px-[10px] h-[40px] flex items-center">
          {children}
        </p>
        <BsChevronDown
          className={clsx(
            "absolute text-[16px] right-[5px] top-1/2 -translate-y-1/2 pointer-events-none transition-transform",
            active && "rotate-180"
          )}
        />
      </div>
    </button>
  );
}
