import Link from "next/link";
import { useState, useContext } from "react";
import Avatar from "../../avatar";
import { isFollowing } from "../../../services/utils";
import { followUser, unfollowUser, getUserByUsername } from "../../../services";
import Loading from "../../loading";
import UserContext from "../../../context/UserContext";
import { db } from "../../../config/firebase.config";

export default function SuggestedProfile({ avatar, username, docId }) {
  const { user, setUser, loggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const following = isFollowing(docId, user?.followings);

  const handleFollow = async () => {
    if (loading || !loggedIn) return;
    setLoading(true);
    !following
      ? await followUser(db, user.uid, docId)
      : await unfollowUser(db, user.uid, docId);
    const userData = await getUserByUsername(db, user?.username);
    setUser(userData);
    setLoading(false);
  };

  return (
    <li className="flex items-center text-[14px] gap-[15px] py-[5px]">
      <Link href={`/${username}`}>
        <a className="w-[30px] h-[30px]">
          <Avatar src={avatar} className={"cursor-pointer"} />
        </a>
      </Link>
      <div className="flex flex-col leading-[20px] font-medium">
        <Link href={`/${username}`} passHref>
          <a className="cursor-pointer hover:underline">{username}</a>
        </Link>
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
