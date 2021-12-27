import { useContext } from "react";
import Avatar from "../Avatar";
import UserContext from "../../context/UserContext";

export default function MiniProfile() {
  const user = useContext(UserContext);
  return (
    <>
      {user?.loggedIn && (
        <div className="h-[100px] flex items-center gap-[20px] text-[14px]">
          <span className="h-[55px] w-[55px]">
            <Avatar src={user?.avatar} size={55} />
          </span>
          <div className="flex flex-col leading-[20px]">
            <span className="font-medium">{user?.username}</span>
            <span className="text-gray-300">{user?.fullName}</span>
          </div>
          <button className="ml-auto text-blue font-medium text-[12px]">
            Switch
          </button>
        </div>
      )}
    </>
  );
}
