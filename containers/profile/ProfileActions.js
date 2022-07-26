import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import ProfileContext from "../../context/ProfileContext";
import { RiSettings3Line } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { isFollowing } from "../../utils";
import Loading from "../../components/loading";
import { getUserByUsername, followUser, unfollowUser } from "../../services";
import { db } from "../../config/firebase.config";
import { ProfileButton } from "../../components/profile";

const ProfileActionsContainer = () => {
  const { user: profileUser, loading } = useContext(ProfileContext);
  const { user, setUser, loggedIn } = useContext(UserContext);
  const [pending, setPending] = useState(false);
  const isFollowed = isFollowing(profileUser?.uid, user?.followings);
  const isFollowMe = isFollowing(user?.uid, profileUser?.followings);

  const handleFollow = async () => {
    if (pending || loading || !loggedIn) return;
    setPending(true);
    !isFollowed
      ? await followUser(db, user.uid, profileUser?.uid)
      : await unfollowUser(db, user.uid, profileUser?.uid);
    const userData = await getUserByUsername(db, user?.username);
    setUser(userData);
    setPending(false);
  };

  return (
    <div className={`flex space-x-[10px] items-center`}>
      {!loading && (
        <>
          {user?.username === profileUser?.username ? (
            <>
              <ProfileButton className={"bg-transparent"}>
                Edit Profile
              </ProfileButton>
              <RiSettings3Line className="text-[25px] cursor-pointer" />{" "}
            </>
          ) : isFollowMe ? (
            <>
              <ProfileButton
                className={
                  "border-none bg-blue text-white px-[20px] min-w-[100px]"
                }
                onClick={handleFollow}
              >
                {!pending ? (
                  "Follow Back"
                ) : (
                  <Loading className={"w-[15px] h-[15px]"} />
                )}
              </ProfileButton>
              <ProfileButton className="px-[5px] text-[25px] border-none bg-blue cursor-pointer text-white">
                <BiChevronDown />
              </ProfileButton>
            </>
          ) : isFollowed ? (
            <>
              <ProfileButton className={"px-[20px]"}>Message</ProfileButton>
              <ProfileButton
                className="px-[30px] cursor-pointer"
                onClick={handleFollow}
              >
                {!pending ? (
                  <FaUserCheck />
                ) : (
                  <Loading className={"w-[15px] h-[15px]"} />
                )}
              </ProfileButton>
              <ProfileButton className="text-[25px] px-[5px] cursor-pointer">
                <BiChevronDown />
              </ProfileButton>
            </>
          ) : !isFollowed ? (
            <>
              <ProfileButton
                className={
                  "border-none bg-blue text-white px-[20px] min-w-[75px]"
                }
                onClick={handleFollow}
              >
                {!pending ? (
                  "Follow"
                ) : (
                  <Loading className={"w-[15px] h-[15px]"} />
                )}
              </ProfileButton>
              <ProfileButton className="px-[5px] text-[25px] border-none bg-blue cursor-pointer text-white">
                <BiChevronDown />
              </ProfileButton>
            </>
          ) : null}
          {user?.username !== profileUser?.username && (
            <HiOutlineDotsHorizontal className="text-[25px] cursor-pointer" />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileActionsContainer;
