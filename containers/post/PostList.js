import usePhotos from "../../hooks/usePhotos";
import Loading from "../../components/loading";
import PostContainer from "../../containers/post";

const PostListContainer = (props) => {
  const { photos, loading } = usePhotos();
  return (
    <>
      {loading ? (
        <Loading className="mt-[50px]" />
      ) : (
        <ul className="mt-[20px]" {...props}>
          {photos.map((photo) => (
            <PostContainer key={photo.photoId} data={photo} />
          ))}
        </ul>
      )}
    </>
  );
};

export default PostListContainer;
