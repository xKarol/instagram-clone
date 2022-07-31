import Link from "next/link";
import Avatar from "../../avatar";
import { isFollowing } from "../../../utils";
import Loading from "../../loading";
import { useUserContext } from "../../../context/UserContext";
import useFollow from "../../../hooks/useFollow";

export default function SuggestedProfile({ avatar, username, docId }) {
  const { user, setUser } = useUserContext();
  const { uid: userId } = user;
  const following = isFollowing(docId, user.followings);

  const { handleFollow, pending } = useFollow({
    isFollowed: following,
    userId,
    followId: docId,
    setUser,
  });

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
        {!pending ? (
          <>{following ? "Following" : "Follow"}</>
        ) : (
          <Loading className="mr-[15px] w-[15px] h-[15px] border-[2px]" />
        )}
      </button>
    </li>
  );
}
