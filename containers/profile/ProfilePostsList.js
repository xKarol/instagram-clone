import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import { ProfilePostsList, ProfilePost } from "../../components/profile";
import Loading from "../../components/loading";

const ProfilePostsListContainer = () => {
  const { photos, loading } = useContext(ProfileContext);

  return (
    <>
      {!!loading && <Loading className="mt-10 mx-auto" />}
      <ProfilePostsList>
        {photos.map((photo) => (
          <ProfilePost key={photo.photoId} data={photo} />
        ))}
      </ProfilePostsList>
    </>
  );
};

export default ProfilePostsListContainer;
