import { ProfileStatistics, ProfileStatisticText } from "../components";
import { useProfileContext } from "../context";

const ProfileStatisticsContainer = ({ ...props }) => {
  const {
    profile: { user, posts },
  } = useProfileContext();

  return (
    <ProfileStatistics {...props}>
      <ProfileStatisticText value={posts.length ?? 0}>
        posts
      </ProfileStatisticText>
      <ProfileStatisticText value={user.followers.length ?? 0}>
        followers
      </ProfileStatisticText>
      <ProfileStatisticText value={user.followings.length ?? 0}>
        following
      </ProfileStatisticText>
    </ProfileStatistics>
  );
};

export default ProfileStatisticsContainer;
