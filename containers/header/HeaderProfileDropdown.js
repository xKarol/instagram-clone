import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { BiBookmark } from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { logOut } from "../../services";
import { useUserContext } from "../../context/UserContext";

const HeaderProfileDropdownContainer = () => {
  const { user } = useUserContext();

  return (
    <>
      <Link href={`/${user.username}`}>
        <a className="w-[220px] flex rounded-t-md py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100">
          <CgProfile />
          Profile
        </a>
      </Link>
      <button
        aria-label="saved"
        className="w-full flex py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100"
      >
        <BiBookmark />
        Saved
      </button>
      <button
        aria-label="settings"
        className="w-full flex py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100"
      >
        <RiSettings3Line />
        Settings
      </button>
      <button
        aria-label="switch accounts"
        className="w-full flex py-[8px] px-[15px] items-center gap-[10px] cursor-pointer hover:bg-gray-100"
      >
        <BsArrowRepeat /> Switch Accounts
      </button>
      <button
        aria-label="log out"
        onClick={async () => await logOut()}
        className="w-full flex rounded-b-md py-[8px] px-[15px] border border-transparent border-t-gray-200 cursor-pointer hover:bg-gray-100"
      >
        Log Out
      </button>
    </>
  );
};

export default HeaderProfileDropdownContainer;
