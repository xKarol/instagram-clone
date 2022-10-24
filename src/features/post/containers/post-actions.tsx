import clsx from "clsx";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";

import { PostActions, PostIcon } from "../components";
import { usePostContext } from "../context";

type Props = React.ComponentProps<typeof PostActions>;

const PostActionsContainer = (props: Props) => {
  const { liked, handleLike } = usePostContext();

  return (
    <PostActions {...props}>
      <PostIcon
        aria-label="like photo"
        onClick={handleLike}
        data-testid="post-like"
        className={clsx(
          "transition-opacity hover:opacity-50",
          liked && "text-red"
        )}
      >
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </PostIcon>
      <PostIcon
        aria-label="comment photo"
        className="transition-opacity hover:opacity-50"
      >
        <FaRegComment />
      </PostIcon>
      <PostIcon
        aria-label="send message"
        className="transition-opacity hover:opacity-50"
      >
        <FiSend />
      </PostIcon>
      <PostIcon
        aria-label="add bookmark"
        className="ml-auto transition-opacity hover:opacity-50"
      >
        <RiBookmarkLine />
      </PostIcon>
    </PostActions>
  );
};

export default PostActionsContainer;
