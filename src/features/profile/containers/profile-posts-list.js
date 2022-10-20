import { Loading } from "../../../components/loading";
import { useProfileContext } from "../context";
import { ProfilePost, ProfilePostsList } from "../components";

const ProfilePostsListContainer = () => {
  const { photos, loading } = useProfileContext();

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
