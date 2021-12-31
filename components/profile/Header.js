import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import Actions from "./Actions";

export default function Header() {
  const { user: profileUser } = useContext(ProfileContext);

  return (
    <>
      <div className="flex items-center space-x-[10px]">
        <span className="text-[26px] font-light truncate mr-[10px]">
          {profileUser?.username}
        </span>
        <Actions className={"hidden md:flex"} />
      </div>
      <Actions className={"md:hidden"} />
    </>
  );
}
