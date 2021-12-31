import { useContext } from "react";
import Avatar from "../Avatar";
import Biography from "./Biography";
import ProfileHeader from "./Header";
import Statistics from "./Statistics";
import ProfileContext from "../../context/ProfileContext";

export default function ProfileData() {
  const { user } = useContext(ProfileContext);
  return (
    <div className="flex mb-[15px] md:mb-[50px]">
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] mx-[25px] md:mx-[100px]">
            <Avatar src={user?.avatar} />
          </div>
          <main className="flex flex-col space-y-[15px]">
            <ProfileHeader />
            <Statistics className={"hidden md:flex border-none"} />
            <Biography className={"hidden md:block"} />
          </main>
        </div>
        <Biography className={"m-[25px] mb-[5px] text-[14px] md:hidden"} />
      </div>
    </div>
  );
}
