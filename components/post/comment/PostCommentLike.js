import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const PostCommentLike = ({ liked = false, children, className, ...props }) => {
  return (
    <button
      className={`ml-auto cursor-pointer transition-opacity hover:opacity-50 ${className}`}
      {...props}
    >
      {liked ? <IoMdHeart className="text-red" /> : <IoMdHeartEmpty />}
    </button>
  );
};

export default PostCommentLike;
