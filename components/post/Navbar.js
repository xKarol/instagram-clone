import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";

export default function Navbar() {
  return (
    <div className="w-full h-[50px] flex gap-[15px] text-[25px] items-center">
      <AiOutlineHeart className="cursor-pointer transition-opacity hover:opacity-50" />
      <FaRegComment className="cursor-pointer transition-opacity hover:opacity-50" />
      <FiSend className="cursor-pointer transition-opacity hover:opacity-50" />
      <RiBookmarkLine className="ml-auto cursor-pointer transition-opacity hover:opacity-50" />
    </div>
  );
}
