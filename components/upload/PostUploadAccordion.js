import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import clsx from "clsx";

const PostUploadAccordion = ({ heading, children }) => {
  const [active, setActive] = useState(false);
  return (
    <button
      className="flex flex-col px-[15px] border border-transparent border-t-gray-200 cursor-pointer"
      onClick={() => setActive(!active)}
    >
      <div className="relative w-full flex">
        <p className="w-full h-[40px] flex items-center">{heading}</p>
        <BsChevronDown
          className={clsx(
            "absolute text-[16px] right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-transform",
            active && "rotate-180"
          )}
        />
      </div>
      {active ? children : null}
    </button>
  );
};

export default PostUploadAccordion;
