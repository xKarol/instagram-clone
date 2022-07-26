import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import { ProfilePostsList, ProfilePost } from "../../components/profile";

const ProfilePostsListContainer = () => {
  const { photos } = useContext(ProfileContext);

  return (
    <ProfilePostsList>
      {photos.map((photo) => (
        <ProfilePost key={photo.photoId} data={photo} />
      ))}
    </ProfilePostsList>
  );
};

export default ProfilePostsListContainer;
