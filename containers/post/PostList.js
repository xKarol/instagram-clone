import usePhotos from "../../hooks/usePhotos";
import Loading from "../../components/loading";
import { PostItemContainer } from "./";
import InfiniteScroll from "react-infinite-scroller";
import { useCallback } from "react";

const PostListContainer = (props) => {
  const { getData, photos, loading, hasMore } = usePhotos();

  const loadMore = useCallback(async () => {
    if (loading) return;
    await getData();
  }, [loading, getData]);

  return (
    <InfiniteScroll
      {...props}
      element="section"
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<Loading className="mt-[50px]" key={0} />}
      useWindow={true}
    >
      {photos.map((photo, index) => (
        <PostItemContainer key={photo.photoId + index} data={photo} />
      ))}
    </InfiniteScroll>
  );
};

export default PostListContainer;
