import { usePostContext } from "../../context/PostContext";
import { PostCommentContainer } from "./";

const PostCommentsList = ({ showAvatar = false, ...props }) => {
  const { comments } = usePostContext();
  return (
    <ul {...props}>
      {comments.map((comment) => (
        <PostCommentContainer
          key={comment.commentId}
          {...comment}
          showAvatar={showAvatar}
          className="mb-[10px]"
        />
      ))}
    </ul>
  );
};

export default PostCommentsList;
