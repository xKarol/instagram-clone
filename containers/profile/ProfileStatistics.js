import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import {
  ProfileStatistics,
  ProfileStatisticText,
} from "../../components/profile";

const ProfileStatisticsContainer = ({ ...props }) => {
  const { user, photos } = useContext(ProfileContext);

  return (
    <ProfileStatistics {...props}>
      <ProfileStatisticText value={photos.length ?? 0}>
        posts
      </ProfileStatisticText>
      <ProfileStatisticText value={user?.followers?.length ?? 0}>
        followers
      </ProfileStatisticText>
      <ProfileStatisticText value={user?.followings?.length ?? 0}>
        following
      </ProfileStatisticText>
    </ProfileStatistics>
  );
};

export default ProfileStatisticsContainer;
