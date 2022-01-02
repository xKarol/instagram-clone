import { useState, useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";
import { likePost } from "../../services/firebase";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";

export default function Navbar() {
  const { photo, liked, setLiked, setLikes, likes } = useContext(PhotoContext);
  const [pending, setPending] = useState(false);
  const { user, loggedIn } = useContext(UserContext);

  const handleLike = async () => {
    if (pending || !loggedIn) return;
    setPending(true);
    if (liked) {
      setLikes(likes.filter((like) => like?.uid !== user?.uid));
    } else {
      setLikes([...likes, { uid: user?.uid }]);
    }
    setLiked(!liked);
    await likePost(photo?.photoId, user?.uid, liked);
    setPending(false);
  };
  return (
    <div className="w-full h-[50px] flex gap-[15px] text-[25px] items-center">
      <button
        onClick={handleLike}
        className={`cursor-pointer transition-opacity hover:opacity-50 ${
          !!liked && "text-red"
        }`}
      >
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <button className="cursor-pointer transition-opacity hover:opacity-50">
        <FaRegComment />
      </button>
      <button className="cursor-pointer transition-opacity hover:opacity-50">
        <FiSend />
      </button>
      <button className="ml-auto cursor-pointer transition-opacity hover:opacity-50">
        <RiBookmarkLine />
      </button>
    </div>
  );
}
