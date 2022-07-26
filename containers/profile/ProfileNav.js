import { CgProfile } from "react-icons/cg";
import { FiBookmark } from "react-icons/fi";
import { MdGridOn } from "react-icons/md";
import { ProfileNav, ProfileNavButton } from "../../components/profile";

const ProfileNavContainer = () => {
  return (
    <ProfileNav>
      <ProfileNavButton icon={<MdGridOn />} active>
        Posts
      </ProfileNavButton>
      <ProfileNavButton icon={<FiBookmark />}>Saved</ProfileNavButton>
      <ProfileNavButton icon={<CgProfile />}>Tagged</ProfileNavButton>
    </ProfileNav>
  );
};

export default ProfileNavContainer;
