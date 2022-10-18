import { CgProfile } from "react-icons/cg";
import { FiBookmark } from "react-icons/fi";
import { MdGridOn } from "react-icons/md";
import { ProfileNav, ProfileNavButton } from "../components";

const ProfileNavContainer = () => {
  const activeElement = 0;
  return (
    <ProfileNav active={activeElement}>
      <ProfileNavButton icon={<MdGridOn />}>Posts</ProfileNavButton>
      <ProfileNavButton icon={<FiBookmark />}>Saved</ProfileNavButton>
      <ProfileNavButton icon={<CgProfile />}>Tagged</ProfileNavButton>
    </ProfileNav>
  );
};

export default ProfileNavContainer;
