import { ProfileStatistics, ProfileStatisticText } from "../components";
import { useProfileContext } from "../context";

const ProfileStatisticsContainer = ({ ...props }) => {
  const { user, photos } = useProfileContext();

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
