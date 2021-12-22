import { MdHomeFilled, MdOutlineAddBox } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegCompass } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";

export default function Header({ user }) {
  return (
    <header className="border-b border-b-gray-200 bg-white fixed z-10 top-0 left-0 right-0">
      <nav className="w-full max-w-[975px] mx-auto h-[60px] flex items-center justify-between">
        <div className="flex-1">
          <Logo size={110} />
        </div>
        <div className="relative">
          <BiSearch className="absolute left-[15px] top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none text-[12px]" />
          <input
            type="text"
            placeholder="Search"
            className="w-[280px] bg-gray-100 py-[17px] pl-[30px] pr-[10px] text-[14px] h-[30px] border border-gray-200 rounded-sm placeholder:text-gray-300"
          />
        </div>
        <div className="flex items-center ml-[80px] gap-[20px] text-[27px]">
          <button>
            <MdHomeFilled />
          </button>
          <button>
            <FiSend />
          </button>
          <button>
            <MdOutlineAddBox />
          </button>
          <button>
            <FaRegCompass />
          </button>
          <button>
            <IoMdHeartEmpty />
          </button>
          <button>
            <Avatar src={user?.avatar} size={23} />
          </button>
        </div>
      </nav>
    </header>
  );
}
