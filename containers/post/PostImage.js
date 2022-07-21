import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { PostImage } from "../../components/post";
import PhotoContext from "../../context/PhotoContext";

const PostImageContainer = (props) => {
  const {
    photo: { user, image: src },
    caption,
    liked,
    handleLike,
  } = useContext(PhotoContext);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    if (!heart) return;
    const timer = setTimeout(() => setHeart(false), 1000);
    return () => clearTimeout(timer);
  }, [heart]);

  const handleDoubleClick = async () => {
    setHeart(true);
    await handleLike();
  };

  return (
    <PostImage
      src={src}
      alt={`${user.username}'s photo ${caption?.length && caption}`}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      {heart && (
        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
