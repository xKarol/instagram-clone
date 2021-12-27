import { CgProfile } from "react-icons/cg";
import { BiBookmark } from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";

export default function ProfileDropdown() {
  return (
    <ul
      className="relative bg-white text-[14px] rounded-md before:shadow-[0_0_5px_1px_rgba(0,0,0,0.05)] before:absolute before:right-[32px] 
        before:-top-[5px] before:bg-white before:w-[15px] before:h-[15px] before:rotate-45 before:z-[-1]"
    >
      <li className="flex rounded-t-md py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100">
        <CgProfile />
        Profile
      </li>
      <li className="flex py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100">
        <BiBookmark />
        Saved
      </li>
      <li className="flex py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100">
        <RiSettings3Line />
        Settings
      </li>
      <li className="flex py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100">
        <BsArrowRepeat /> Switch Accounts
      </li>
      <li className="rounded-b-md py-[8px] px-[15px] border border-transparent border-t-gray-200 cursor-pointer hover:bg-gray-100">
        Log Out
      </li>
    </ul>
  );
}
