import { useContext } from "react";
import { useUserContext } from "../../context/UserContext";
import ProfileContext from "../../context/ProfileContext";
import { RiSettings3Line } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { isFollowing } from "../../utils";
import Loading from "../../components/loading";
import { ProfileButton } from "../../components/profile";
import useFollow from "../../hooks/useFollow";

const ProfileActionsContainer = () => {
  const { user: profileUser, loading } = useContext(ProfileContext);
  const { user, setUser } = useUserContext();
  const { uid: profileId, username: profileName } = profileUser;
  const { uid: userId, username } = user;

  const isFollowed = isFollowing(profileId, user.followings);
  const isFollowMe = isFollowing(userId, profileUser.followings);
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
