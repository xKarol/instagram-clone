import { BiChevronDown } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiSettings3Line } from "react-icons/ri";
import { Loading } from "../../../components/loading";
import { useUserContext } from "../../../context/user-context";
import useFollow from "../../../hooks/use-follow";
import { isFollowing } from "../../../utils";
import { ProfileButton } from "../components";
import { useProfileContext } from "../context";

const ProfileActionsContainer = () => {
  const {
    profile: { user: profileUser },
    loading,
  } = useProfileContext();
  const { user, setUser } = useUserContext();
  const {
    uid: profileId,
    username: profileName,
    followings: profileFollowings,
  } = profileUser;
  const { uid: userId, username, followings: userFollowings } = user;

  const isFollowed = isFollowing(profileId, userFollowings);
  const isFollowMe = isFollowing(userId, profileFollowings);
  const { handleFollow, pending } = useFollow({
    isFollowed,
    userId,
    followId: profileId,
    setUser,
  });

  return (
    <div className={`flex space-x-[10px] items-center`}>
      {!loading && (
        <>
          {username === profileName ? (
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
          {username !== profileName && (
            <HiOutlineDotsHorizontal className="text-[25px] cursor-pointer" />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileActionsContainer;
