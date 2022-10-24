import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useUserContext } from "../../../context/user-context";
import { PostImage } from "../components";
import { usePostContext } from "../context";

type Props = Partial<React.ComponentProps<typeof PostImage>>;

const PostImageContainer = (props: Props) => {
  const {
    photo: {
      user: { username },
      image: src,
      caption,
    },
    liked,
    handleLike,
  } = usePostContext();
  const {
    user: { uid: userId },
  } = useUserContext();
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    if (!heart) return;
    const timer = setTimeout(() => setHeart(false), 1000);
    return () => clearTimeout(timer);
  }, [heart]);

  const handleDoubleClick = async () => {
    if (!userId) return;
    setHeart(true);
    await handleLike();
  };

  return (
    <PostImage
      src={src}
      alt={`${username}'s photo ${caption ?? ""}`}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      {heart && (
        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max">
          <AiFillHeart
            className={`${
              liked && "scaleAnim"
            } text-white drop-shadow-xl opacity-90 text-[100px]`}
          />
        </div>
      )}
    </PostImage>
  );
};

export default PostImageContainer;
