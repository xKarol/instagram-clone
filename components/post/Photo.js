import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";
import { AiFillHeart } from "react-icons/ai";
import { likePost } from "../../services/firebase";

export default function Photo() {
  const { photo, liked, setLiked } = useContext(PhotoContext);
  const { user } = useContext(UserContext);
  const [heart, setHeart] = useState(false);

  const handleLike = () => {
    likePost(photo?.photoId, user?.uid, liked);
    setLiked(!liked);
    setHeart(true);
  };

  useEffect(() => {
    if (!heart) return;
    const timer = setTimeout(() => setHeart(false), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [heart]);

  return (
    <div className="w-full relative" onDoubleClick={handleLike}>
      {heart && (
        <div className="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AiFillHeart
            className={`${
              !liked && "scaleAnim"
            } text-white drop-shadow-xl opacity-90 text-[100px]`}
          />
        </div>
      )}
      <Image
        src={photo?.image}
        alt={`${photo?.user?.username}'s photo ${
          photo?.caption && photo?.caption
        }`}
        layout="responsive"
        width={"100%"}
        height={"100%"}
        objectFit="cover"
        priority
      />
    </div>
  );
}
