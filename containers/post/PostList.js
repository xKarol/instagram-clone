import usePhotos from "../../hooks/usePhotos";
import Loading from "../../components/loading";
import { PostItemContainer } from "./";

const PostListContainer = (props) => {
  const { photos, loading } = usePhotos();
  return (
    <>
      {loading ? (
        <Loading className="mt-[50px]" />
      ) : (
        <ul {...props}>
          {photos.map((photo) => (
            <PostItemContainer key={photo.photoId} data={photo} />
          ))}
        </ul>
      )}
    </>
  );
};

export default PostListContainer;
