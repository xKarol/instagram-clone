import { useContext } from "react";
import Avatar from "../Avatar";
import { isFollowing } from "../../services/utils";
import { handleFollowUser } from "../../services/firebase";
import UserContext from "../../context/UserContext";

export default function SuggestedProfile({ avatar, username, docId }) {
  const user = useContext(UserContext);
  const handleFollow = async () => {
    await handleFollowUser(
      user.uid,
      docId,
      isFollowing(docId, user?.followings)
    );
  };
  return (
    <li className="flex items-center text-[14px] gap-[15px] py-[5px]">
      <Avatar src={avatar} size={30} />
      <div className="flex flex-col leading-[20px] font-medium">
        <span>{username}</span>
        <span className="text-gray-300 text-[12px] font-normal">Popular</span>
      </div>
      <button
        className="ml-auto text-blue font-medium text-[12px]"
        onClick={handleFollow}
      >
        Follow
      </button>
    </li>
  );
}
