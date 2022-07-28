import { usePostContext } from "../../context/PostContext";
import { PostText } from "../../components/post";

const PostLikesContainer = () => {
  const { likes } = usePostContext();

  return (
    <PostText data-cy="post-likes-amount">
      {likes.length}
      &nbsp;
      {likes.length === 1 ? "like" : "likes"}
    </PostText>
  );
};

export default PostLikesContainer;
