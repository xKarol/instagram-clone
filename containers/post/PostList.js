import usePhotos from "../../hooks/usePhotos";
import Loading from "../../components/loading";
import { PostItemContainer } from "./";
import InfiniteScroll from "react-infinite-scroller";

const PostListContainer = (props) => {
  const { getData, photos, hasMore } = usePhotos();

  return (
    <InfiniteScroll
      {...props}
      element="section"
      loadMore={getData}
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
