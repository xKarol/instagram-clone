import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import ProfileContext from "../../context/ProfileContext";
import { RiSettings3Line } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import Button from "./Button";
import { isFollowing } from "../../services/utils";
import Loading from "../Loading";
import {
  getUserByUsername,
  followUser,
  unfollowUser,
} from "../../services/firebase";

export default function Actions({ className }) {
  const { user: profileUser } = useContext(ProfileContext);
  const { user, setUser } = useContext(UserContext);
  const [pending, setPending] = useState(false);
  const isFollowed = isFollowing(profileUser?.uid, user?.followings);
  const isFollowMe =
    profileUser?.followings?.findIndex(
      (follow) => follow?.uid === user?.uid
    ) !== -1;

  const handleFollow = async () => {
    if (pending) return;
    setPending(true);
    !isFollowed
      ? await followUser(user.uid, profileUser?.uid)
      : await unfollowUser(user.uid, profileUser?.uid);
    const userData = await getUserByUsername(user?.username);
    setUser(userData);
    setPending(false);
  };

  return (
    <div className={`flex space-x-[10px] items-center ${className}`}>
      {user?.username === profileUser?.username ? (
        <>
          <Button className={"bg-transparent"}>Edit Profile</Button>
          <RiSettings3Line className="text-[25px] cursor-pointer" />{" "}
        </>
      ) : isFollowMe ? (
        <>
          <Button
            className={"border-none bg-blue text-white px-[20px] min-w-[100px]"}
            onClick={handleFollow}
          >
            {!pending ? (
              "Follow Back"
            ) : (
              <Loading className={"w-[15px] h-[15px]"} />
            )}
          </Button>
          <Button className="px-[5px] text-[25px] border-none bg-blue cursor-pointer text-white">
            <BiChevronDown />
          </Button>
        </>
      ) : isFollowed ? (
        <>
          <Button className={"px-[20px]"}>Message</Button>
          <Button className="px-[30px] cursor-pointer" onClick={handleFollow}>
            {!pending ? (
              <FaUserCheck />
            ) : (
              <Loading className={"w-[15px] h-[15px]"} />
            )}
          </Button>
          <Button className="text-[25px] px-[5px] cursor-pointer">
            <BiChevronDown />
          </Button>
        </>
      ) : !isFollowed ? (
        <>
          <Button
            className={"border-none bg-blue text-white px-[20px] min-w-[75px]"}
            onClick={handleFollow}
          >
            {!pending ? "Follow" : <Loading className={"w-[15px] h-[15px]"} />}
          </Button>
          <Button className="px-[5px] text-[25px] border-none bg-blue cursor-pointer text-white">
            <BiChevronDown />
          </Button>
        </>
      ) : null}
      {user?.username !== profileUser?.username && (
        <HiOutlineDotsHorizontal className="text-[25px] cursor-pointer" />
      )}
    </div>
  );
}
