import { RiSettings3Line } from "react-icons/ri";
import EditButton from "./EditButton";

export default function Header({ username }) {
  return (
    <>
      <div className="flex items-center space-x-[15px]">
        <span className="text-[26px] font-light truncate">{username}</span>
        <EditButton className={"hidden md:block"}>Edit Profile</EditButton>
        <RiSettings3Line className="text-[25px] cursor-pointer" />
      </div>
      <EditButton className={"mt-[10px] w-[50vw] md:hidden"}>
        Edit Profile
      </EditButton>
    </>
  );
}
