import { useContext } from "react";
import Avatar from "../avatar";
import Biography from "./Biography";
import ChangeAvatar from "./ChangeAvatar";
import Header from "./Header";
import Statistics from "./Statistics";
import ProfileContext from "../../context/ProfileContext";
import { SCREEN_MEDIUM } from "../../constants/screens";
import Skeleton from "../skeleton";
import { useViewport } from "../../context/ViewportContext";

export default function ProfileData() {
  const { user, loading } = useContext(ProfileContext);
  const { width } = useViewport();

  return (
    <div className="flex mb-[15px] md:mb-[50px]">
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] mx-[25px] md:mx-[100px]">
            {!loading ? (
              <ChangeAvatar>
                <Avatar src={user?.avatar} />
              </ChangeAvatar>
            ) : (
              <Skeleton className={"w-full h-full rounded-full"} />
            )}
          </div>
          <main className="flex flex-col space-y-[15px]">
            <Header />
            <Statistics className={"hidden md:flex border-none"} />
            {width >= SCREEN_MEDIUM && (
              <Biography className={"hidden md:block"} />
            )}
          </main>
        </div>
        {width < SCREEN_MEDIUM && (
          <Biography className={"m-[25px] mb-[5px] text-[14px] md:hidden"} />
        )}
      </div>
    </div>
  );
}
