import { useState, useContext } from "react";
import Avatar from "../Avatar";
import { isFollowing } from "../../services/utils";
import {
  followUser,
  unfollowUser,
  getUserByUsername,
} from "../../services/firebase";
import Loading from "../Loading";
import UserContext from "../../context/UserContext";

export default function SuggestedProfile({ avatar, username, docId }) {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const following = isFollowing(docId, user?.followings);

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);
    !following
      ? await followUser(user.uid, docId)
      : await unfollowUser(user.uid, docId);
    const userData = await getUserByUsername(user?.username);
    setUser(userData);
    setLoading(false);
  };

  return (
    <li className="flex items-center text-[14px] gap-[15px] py-[5px]">
      <Avatar src={avatar} size={30} />
      <div className="flex flex-col leading-[20px] font-medium">
        <span>{username}</span>
        <span className="text-gray-300 text-[12px] font-normal">Popular</span>
      </div>
      <button
        className={`ml-auto ${
          !following && "text-blue"
        } font-medium text-[12px]`}
        onClick={handleFollow}
      >
        {!loading ? (
          <>{following ? "Following" : "Follow"}</>
        ) : (
          <Loading className="mr-[15px] w-[15px] h-[15px] border-[2px]" />
        )}
      </button>
    </li>
  );
}
