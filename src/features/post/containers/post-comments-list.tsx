import clsx from "clsx";
import { usePostContext } from "../context";
import { MAX_COMMENTS_ITEMS } from "../constants";
import { PostCommentContainer } from ".";

type Props = React.ComponentPropsWithoutRef<"ul"> & {
  showAvatar?: boolean;
  className: string;
};

const PostCommentsList = ({
  showAvatar = false,
  className,
  ...props
}: Props) => {
  const { comments } = usePostContext();

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
