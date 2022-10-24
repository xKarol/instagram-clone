import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  liked: boolean;
};

const PostCommentLike = ({ liked = false, className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        "ml-auto cursor-pointer transition-opacity hover:opacity-50",
        className
      )}
      {...props}
    >
      {liked ? <IoMdHeart className="text-red" /> : <IoMdHeartEmpty />}
    </button>
  );
};

export default PostCommentLike;
