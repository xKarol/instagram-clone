import { usePostContext } from "../../../context/post-context";
import { PostText } from "../components";

const PostLikesContainer = () => {
  const { likes } = usePostContext();

  return (
    <PostText data-testid="post-likes-amount">
      {likes.length}
      &nbsp;
      {likes.length === 1 ? "like" : "likes"}
    </PostText>
  );
};

export default PostLikesContainer;
