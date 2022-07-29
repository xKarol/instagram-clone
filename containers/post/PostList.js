import usePhotos from "../../hooks/usePhotos";
import Loading from "../../components/loading";
import { PostItemContainer } from "./";
import InfiniteScroll from "react-infinite-scroller";

const PostListContainer = (props) => {
  const { getData, photos, loading, hasMore } = usePhotos();

  const loadMore = async () => {
    if (loading) return;
    await getData();
  };

  return (
    <InfiniteScroll
      {...props}
      element="ul"
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<Loading className="mt-[50px]" key={0} />}
      useWindow={true}
    >
      {photos.map((photo) => (
        <PostItemContainer key={photo.photoId} data={photo} />
      ))}
    </InfiniteScroll>
  );
};

export default PostListContainer;
