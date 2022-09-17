import clsx from "clsx";
import { usePostContext } from "../../context/PostContext";
import { PostCommentContainer } from "./";

const PostCommentsList = ({ showAvatar = false, className, ...props }) => {
  const { comments } = usePostContext();
  return (
    <ul className={clsx(className)} {...props} data-cy="post-comments-list">
      {comments.map((comment) => (
        <PostCommentContainer
          key={comment.commentId}
          {...comment}
          showAvatar={showAvatar}
        />
      ))}
    </ul>
  );
};

export default PostCommentsList;
