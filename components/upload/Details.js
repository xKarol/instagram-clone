import { BsEmojiSmile, BsChevronDown } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Avatar from "../Avatar";

export default function Details() {
  return (
    <section className="flex flex-col border border-transparent border-l-gray-200 h-full w-[300px] overflow-y-scroll">
      <header className="p-[15px] flex space-x-[10px] items-center font-medium">
        <Avatar src={null} size={30} />
        <span>karol</span>
      </header>
      <textarea
        autoComplete="off"
        placeholder="Write a caption..."
        className="px-[15px] outline-none min-h-[150px] resize-none"
      />
      <div className="flex items-center justify-between px-[15px] my-[10px] text-gray-300">
        <BsEmojiSmile className="text-[18px] cursor-pointer" />
        <span className="text-[12px] cursor-default transition-colors hover:text-black">
          0/2,200
        </span>
      </div>
      <div className="flex border border-transparent border-t-gray-200">
        <div className="relative w-[calc(100%-15px)] mx-auto flex">
          <input
            type="text"
            className="w-full px-[10px] h-[40px]"
            placeholder="Add location"
          />
          <GoLocation className="absolute text-[16px] right-[5px] top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      <div className="flex border border-transparent border-t-gray-200">
        <div className="relative w-[calc(100%-15px)] mx-auto flex">
          <p className="w-full px-[10px] h-[40px] flex items-center">
            Accessibility
          </p>
          <BsChevronDown className="absolute text-[16px] right-[5px] top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      <div className="flex border border-transparent border-t-gray-200">
        <div className="relative w-[calc(100%-15px)] mx-auto flex">
          <p className="w-full px-[10px] h-[40px] flex items-center">
            Advanced Settings
          </p>
          <BsChevronDown className="absolute text-[16px] right-[5px] top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
