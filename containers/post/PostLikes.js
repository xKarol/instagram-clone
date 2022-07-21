import { useContext } from "react";
import { PostText } from "../../components/post";
import PhotoContext from "../../context/PhotoContext";

const PostLikesContainer = () => {
  const {
    photo: { likes },
  } = useContext(PhotoContext);

  return (
    <PostText data-cy="post-likes-amount">
      {likes.length}
      &nbsp;
      {likes.length === 1 ? "like" : "likes"}
    </PostText>
  );
};

export default PostLikesContainer;
