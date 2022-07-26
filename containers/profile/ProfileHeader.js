import { ProfileHeader, ProfileBiography } from "../../components/profile";
import {
  ProfileAvatarChangeContainer,
  ProfileStatisticsContainer,
  ProfileActionsContainer,
  ProfileNameContainer,
} from "./";
import Avatar from "../../components/avatar";
import Skeleton from "../../components/skeleton";
import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";

const ProfileHeaderContainer = ({ viewport }) => {
  const { user: profileUser, loading } = useContext(ProfileContext);
  const biography = "No bio yet";

  return viewport === "desktop" ? (
    <ProfileHeader>
      <ProfileAvatarChangeContainer className="mx-[100px]">
        {!loading ? (
          <Avatar src={profileUser.avatar} size={150} />
        ) : (
          <Skeleton className={"w-[150px] h-[150px] rounded-full"} />
        )}
      </ProfileAvatarChangeContainer>
      <section className="flex flex-col space-y-[15px]">
        <div className="flex space-x-[10px]">
          <ProfileNameContainer />
          <ProfileActionsContainer />
        </div>
        <ProfileStatisticsContainer />
        <ProfileBiography>{biography}</ProfileBiography>
      </section>
    </ProfileHeader>
  ) : (
    <>
      <ProfileHeader>
        <div className="flex flex-col">
          <div className="flex">
            <ProfileAvatarChangeContainer className="mx-[25px]">
              {!loading ? (
                <Avatar src={profileUser.avatar} size={80} />
              ) : (
                <Skeleton className={"w-[80px] h-[80px] rounded-full"} />
              )}
            </ProfileAvatarChangeContainer>

            <section className="flex flex-col space-y-[15px]">
              <ProfileNameContainer />
              <ProfileActionsContainer />
            </section>
          </div>
          <ProfileBiography className={"m-[25px] mb-[5px] text-[14px]"}>
            {biography}
          </ProfileBiography>
        </div>
      </ProfileHeader>
      <ProfileStatisticsContainer className="border border-transparent border-t-gray-200" />
    </>
  );
};

export default ProfileHeaderContainer;
