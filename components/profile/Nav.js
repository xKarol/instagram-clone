import { MdGridOn } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import NavButton from "./NavButton";

export default function Nav() {
  return (
    <nav className="w-full border border-transparent border-t-gray-200 flex justify-center space-x-[50px] text-gray-300">
      <NavButton Icon={<MdGridOn />} text={"Posts"} active />
      <NavButton Icon={<FiBookmark />} text={"Saved"} />
      <NavButton Icon={<CgProfile />} text={"Tagged"} />
    </nav>
  );
}
