import InfiniteScroll from "react-infinite-scroller";
import Loading from "../../../components/loading";
import usePhotos from "../../../hooks/use-photos";
import { PostItemContainer } from ".";

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
