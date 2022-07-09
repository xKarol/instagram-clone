import { BsEmojiSmile } from "react-icons/bs";

const PostCommentEmote = ({ children, className, ...props }) => {
  return (
    <button className={`text-[22px] cursor-pointer ${className}`} {...props}>
      <BsEmojiSmile />
    </button>
  );
};

export default PostCommentEmote;
