import { BsEmojiSmile } from "react-icons/bs";
import clsx from "clsx";

const PostCommentEmote = ({ className, ...props }) => {
  return (
    <button
      className={clsx("text-[22px] cursor-pointer", className)}
      {...props}
    >
      <BsEmojiSmile />
    </button>
  );
};

export default PostCommentEmote;
