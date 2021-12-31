import { useState, useContext } from "react";
import Link from "next/link";
import { MdHomeFilled, MdOutlineAddBox } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegCompass } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import UserContext from "../context/UserContext";
import DropdownMenu from "../components/DropdownMenu";
import ProfileDropdown from "../components/ProfileDropdown";
import Upload from "../components/upload";

export default function Header() {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loggedIn, user } = useContext(UserContext);

  return (
    <>
      <header className="border-b border-b-gray-200 bg-white fixed z-50 top-0 left-0 right-0">
        <nav className="w-full max-w-[975px] mx-auto h-[60px] flex items-center justify-between px-[20px] 1000px:px-0">
          <div className="flex-1 shrink-0 max-w-[300px] min-w-[110px] sm:basis-[150px]">
            <Logo size={110} />
          </div>
          <div className="basis-[280px] relative hidden sm:block">
            <BiSearch className="absolute left-[15px] top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none text-[12px]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 py-[17px] pl-[30px] pr-[10px] text-[14px] h-[30px] border border-gray-200 rounded-sm placeholder:text-gray-300"
            />
          </div>
          <div className="sm:pl-[20px] flex shrink-0 items-center gap-[10px] sm:gap-[20px] text-[23px]">
            {loggedIn ? (
              <>
                <Link href="/" passHref>
                  <button>
                    <MdHomeFilled />
                  </button>
                </Link>
                <button>
                  <FiSend />
                </button>
                <button onClick={() => setShow(true)}>
                  <MdOutlineAddBox />
                </button>
                <button>
                  <FaRegCompass />
                </button>
                <button
                  id="dropdown"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <IoMdHeartEmpty className="pointer-events-none" />
                </button>
                <button
                  className="w-[23px] h-[23px]"
                  id="dropdown"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Avatar
                    src={user?.avatar}
                    size={23}
                    className="pointer-events-none"
                  />
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <a className="bg-blue text-white rounded-[5px] text-[14px] font-medium px-[12px] py-[4px]">
                    Log In
                  </a>
                </Link>
                <Link href="/sign-up">
                  <a className="bg-transparent text-blue text-[14px] font-medium">
                    Sign Up
                  </a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <Upload show={show} setShow={setShow} />
      <DropdownMenu
        setShow={setShowDropdown}
        show={showDropdown}
        element={<ProfileDropdown />}
      />
    </>
  );
}
