import clsx from "clsx";
import { usePostContext } from "../context";
import { PostCommentContainer } from ".";

const MAX_COMMENTS_ITEMS = 3;

const PostCommentsList = ({ showAvatar = false, className, ...props }) => {
  const { comments } = usePostContext();

  console.log(comments.length);

  return (
    <ul className={clsx(className)} {...props} data-testid="post-comments-list">
      {comments
        .slice(0, showAvatar ? -1 : MAX_COMMENTS_ITEMS)
        .map((comment) => (
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
