import { useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";
import PostActions from "../../components/post/PostActions";
import PostIcon from "../../components/post/PostIcon";
import PhotoContext from "../../context/PhotoContext";

const PostActionsContainer = () => {
  const { liked, handleLike } = useContext(PhotoContext);

  return (
    <PostActions>
      <PostIcon
        aria-label="like photo"
        onClick={handleLike}
        data-cy="post-like"
        className={`transition-opacity hover:opacity-50 ${
          !!liked && "text-red"
        }`}
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
