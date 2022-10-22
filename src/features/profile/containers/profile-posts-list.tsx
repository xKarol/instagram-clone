import { Loading } from "../../../components/loading";
import { useProfileContext } from "../context";
import { ProfilePost, ProfilePostsList } from "../components";

const ProfilePostsListContainer = () => {
  const {
    profile: { posts },
    loading,
  } = useProfileContext();

  return (
    <>
      {!!loading && <Loading className="mt-10 mx-auto" />}
      <ProfilePostsList>
        {posts.map((post) => (
          <ProfilePost key={post.photoId} data={post} />
        ))}
      </ProfilePostsList>
    </>
  );
};

export default ProfilePostsListContainer;
