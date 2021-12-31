import { RiSettings3Line } from "react-icons/ri";

export default function Header({username}) {
  return (
    <div className="flex items-center space-x-[15px]">
      <span className="text-[26px] font-light">{username}</span>
      <button className="text-[14px] p-[4px] px-[8px] font-medium bg-transparent border border-gray-200 rounded-[5px]">
        Edit Profile
      </button>
      <RiSettings3Line className="text-[25px] cursor-pointer" />
    </div>
  );
}
