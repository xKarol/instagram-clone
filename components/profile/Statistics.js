import { useContext } from "react";
import StatisticData from "./StatisticData";
import ProfileContext from "../../context/ProfileContext";

export default function Statistics({ className }) {
  const { user, photos } = useContext(ProfileContext);
  return (
    <div
      className={`flex text-[14px] md:text-[16px] md:space-x-[30px] py-[5px] border border-transparent border-t-gray-200 ${className}`}
    >
      <StatisticData name="posts" value={photos?.length ?? 0} />
      <StatisticData name="followers" value={user?.followers?.length ?? 0} />
      <StatisticData name="following" value={user?.followings?.length ?? 0} />
    </div>
  );
}
