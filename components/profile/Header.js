import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import Actions from "./Actions";
import { SCREEN_MEDIUM } from "../../constants/screens";
import Skeleton from "../Skeleton";
import { useViewport } from "../../context/ViewportContext";

export default function Header() {
  const { user: profileUser, loading } = useContext(ProfileContext);
  const { width } = useViewport();

  return (
    <>
      <div className="flex items-center space-x-[10px]">
        <span className="text-[26px] font-light truncate mr-[10px]">
          {!loading ? (
            <>{profileUser?.username}</>
          ) : (
            <Skeleton className={"w-[50px] h-[20px] rounded-md"} />
          )}
        </span>
        {width >= SCREEN_MEDIUM && <Actions className={"hidden md:flex"} />}
      </div>
      {width < SCREEN_MEDIUM && <Actions className={"md:hidden"} />}
    </>
  );
}
