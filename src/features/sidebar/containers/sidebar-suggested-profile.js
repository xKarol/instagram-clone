import Link from "next/link";
import { useCallback, useState } from "react";
import { Avatar } from "../../../components/avatar";
import { Loading } from "../../../components/loading";
import { db } from "../../../config/firebase.config";
import { useUserContext } from "../../../context/user-context";
import { followUser, getUserByUsername, unfollowUser } from "../../../services";
import { isFollowing } from "../../../utils";
import { SidebarButton, SidebarSuggestionItem } from "../components";

const SidebarSuggestedProfileContainer = ({ avatar, username, docId }) => {
  const {
    user: { uid: userId, ...user },
    setUser,
    loggedIn,
  } = useUserContext();
  const [loading, setLoading] = useState(false);
  const following = isFollowing(docId, user.followings);
  const followingText = following ? "Following" : "Follow";

  const handleFollow = useCallback(async () => {
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
  }, [docId, following, loading, loggedIn, setUser, user.username, userId]);

  return (
    <SidebarSuggestionItem
      className="flex items-center text-[14px] gap-[15px] py-[5px]"
      data-testid="sidebar-suggested-profile"
    >
      <Link href={`/${username}`}>
        <a>
          <Avatar src={avatar} size={30} alt={`${username}'s avatar`} />
        </a>
      </Link>
      <div className="flex flex-col leading-[20px] font-medium">
        <Link href={`/${username}`}>
          <a
            className="cursor-pointer hover:underline"
            data-testid="sidebar-suggested-profile-username"
          >
            {username}
          </a>
        </Link>
        <span className="text-gray-300 text-[12px] font-normal">Popular</span>
      </div>
      <SidebarButton
        className={`ml-auto ${
          !following && "text-blue"
        } font-medium text-[12px]`}
        onClick={handleFollow}
      >
        {loading ? (
          <Loading className="mr-[15px] w-[15px] h-[15px] border-[2px]" />
        ) : (
          followingText
        )}
      </SidebarButton>
    </SidebarSuggestionItem>
  );
};

export default SidebarSuggestedProfileContainer;
