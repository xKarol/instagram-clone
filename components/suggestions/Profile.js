import Link from "next/link";
import { useContext } from "react";
import Avatar from "../Avatar";
import UserContext from "../../context/UserContext";

export default function Profile() {
  const { loggedIn, user } = useContext(UserContext);
  return (
    <>
      {loggedIn && (
        <article className="h-[100px] flex items-center gap-[20px] text-[14px]">
          <Link href={`/${user?.username}`}>
            <a className="h-[55px] w-[55px]">
              <Avatar src={user?.avatar} />
            </a>
          </Link>
          <div className="flex flex-col leading-[20px]">
            <Link href={`/${user?.username}`}>
              <a className="font-medium">{user?.username}</a>
            </Link>
            <span className="text-gray-300">{user?.fullName}</span>
          </div>
          <button className="ml-auto text-blue font-medium text-[12px]">
            Switch
          </button>
        </article>
      )}
    </>
  );
}
