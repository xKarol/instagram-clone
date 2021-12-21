import Image from "next/image";
import React from "react";
import { MdHomeFilled, MdOutlineAddBox } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegCompass } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";

export default function Header({ user }) {
  return (
    <header className="border-b border-b-gray-200 ">
      <nav className="w-full max-w-5xl mx-auto h-[50px] flex items-center justify-between">
        <Logo size={100} />
        <div className="relative">
          <BiSearch className="absolute left-[50px] top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-[200px] bg-transparent px-[75px] text-[12px] h-[30px] border border-gray-200 rounded-sm placeholder:text-gray-300"
          />
        </div>
        <div className="flex items-center gap-[15px] text-[23px]">
          <button>
            <MdHomeFilled />
          </button>
          <button>
            <RiMessengerLine />
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
            <Avatar src={user?.avatar} size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
