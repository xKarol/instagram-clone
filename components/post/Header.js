import Avatar from "../Avatar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Header({ username, avatar }) {
  return (
    <div className="flex h-[60px] items-center px-[20px]">
      <Avatar src={avatar} size={30} className={"mr-[15px]"} />
      <span className="text-[14px] font-medium">{username}</span>
      <HiOutlineDotsHorizontal className="ml-auto text-[25px] cursor-pointer" />
    </div>
  );
}
