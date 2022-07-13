import Avatar from "../../components/avatar";
import SidebarSuggestionItem from "../../components/sidebar/suggestions/SidebarSuggestionItem";
import Link from "next/link";
import SidebarButton from "../../components/sidebar/SidebarButton";
import Loading from "../../components/loading";
import { isFollowing } from "../../services/utils";
import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";
import { followUser, getUserByUsername, unfollowUser } from "../../services";
import { db } from "../../config/firebase.config";
import Skeleton from "../../components/skeleton";

const SidebarSuggestedProfileContainer = ({
  skeleton,
  avatar,
  username,
  docId,
}) => {
  const {
    user: { uid: userId, ...user },
    setUser,
    loggedIn,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const following = isFollowing(docId, user.followings);

  const handleFollow = async () => {
    if (loading || !loggedIn) return;
    try {
      setLoading(true);
      !following
        ? await followUser(db, userId, docId)
        : await unfollowUser(db, userId, docId);
      const userData = await getUserByUsername(db, user.username);
      setUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarSuggestionItem className="flex items-center text-[14px] gap-[15px] py-[5px]">
      {!skeleton ? (
        <>
          <Link href={`/${username}`}>
            <a>
              <Avatar src={avatar} size={30} />
            </a>
          </Link>
          <div className="flex flex-col leading-[20px] font-medium">
            <Link href={`/${username}`}>
              <a className="cursor-pointer hover:underline">{username}</a>
            </Link>
            <span className="text-gray-300 text-[12px] font-normal">
              Popular
            </span>
          </div>
          <SidebarButton
            className={`ml-auto ${
              !following && "text-blue"
            } font-medium text-[12px]`}
            onClick={handleFollow}
          >
            {!loading ? (
              following ? (
                "Following"
              ) : (
                "Follow"
              )
            ) : (
              <Loading className="mr-[15px] w-[15px] h-[15px] border-[2px]" />
            )}
          </SidebarButton>
        </>
      ) : (
        <div className="flex items-center py-[5px]">
          <Skeleton className="w-[32px] h-[32px] rounded-full mr-[10px]" />
          <div className="flex flex-col">
            <Skeleton className="w-[115px] h-[15px] rounded-[4px] mb-[4px]" />
            <Skeleton className="w-[80px] h-[15px] rounded-[4px]" />
          </div>
        </div>
      )}
    </SidebarSuggestionItem>
  );
};

export default SidebarSuggestedProfileContainer;
