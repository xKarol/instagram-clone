import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";
import { AiFillHeart } from "react-icons/ai";
import { likePost } from "../../services/firebase";

export default function Photo({ className }) {
  const { photo, liked, setLiked, setLikes, likes } = useContext(PhotoContext);
  const { user } = useContext(UserContext);
  const [heart, setHeart] = useState(false);
  const [pending, setPending] = useState(false);

  const handleLike = async () => {
    if (pending) return;
    setPending(true);
    setHeart(true);
    if (liked) {
      setLikes(likes.filter((like) => like?.uid !== user?.uid));
    } else {
      setLikes([...likes, { uid: user?.uid }]);
    }
    setLiked(!liked);
    await likePost(photo?.photoId, user?.uid, liked);
    setPending(false);
  };

  useEffect(() => {
    if (!heart) return;
    const timer = setTimeout(() => setHeart(false), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [heart]);

  const placeholderImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcsnt3PQAHAAKrcPYcMAAAAABJRU5ErkJggg==";

  return (
    <div
      className={`w-full relative h-full ${className}`}
      onDoubleClick={handleLike}
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

      <Image
        src={photo?.image}
        alt={`${photo?.user?.username}'s photo ${
          photo?.caption && photo?.caption
        }`}
        layout="fill"
        objectFit="cover"
        priority
        placeholder="blur"
        blurDataURL={placeholderImage}
      />
    </div>
  );
}
