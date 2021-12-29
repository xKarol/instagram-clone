import { useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";
import { likePost } from "../../services/firebase";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";

export default function Navbar() {
  const { photo, liked, setLiked } = useContext(PhotoContext);
  const { user } = useContext(UserContext);

  const handleLike = () => {
    likePost(photo?.photoId, user?.uid, liked);
    setLiked(!liked);
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
