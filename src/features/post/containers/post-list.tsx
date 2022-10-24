import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../../../components/loading";
import { usePosts } from "../hooks";
import { PostItemContainer } from ".";

type Props = React.ComponentProps<typeof InfiniteScroll>;

const PostListContainer = (props: Props) => {
  const { getData, photos, hasMore } = usePosts();

  return (
    <InfiniteScroll
      {...props}
      element="section"
      loadMore={getData}
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
