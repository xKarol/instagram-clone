import { BsEmojiSmile } from "react-icons/bs";
import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"button">;

const PostCommentEmote = ({ className, ...props }: Props) => {
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
