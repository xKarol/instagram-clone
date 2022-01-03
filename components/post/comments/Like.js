import { useLayoutEffect, useState, useContext } from "react";
import { likeComment } from "../../../services/firebase";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import UserContext from "../../../context/UserContext";
import PhotoContext from "../../../context/PhotoContext";
import CommentContext from "../../../context/CommentContext";

export default function Like() {
  const comment = useContext(CommentContext);
  const [pending, setPending] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment?.likes ?? []);
  const { user, loggedIn } = useContext(UserContext);
  const { photo } = useContext(PhotoContext);

  useLayoutEffect(() => {
    setLiked(
      likes?.findIndex((like) => like?.uid === user?.uid) === -1 ? false : true
    );
  }, [likes, user?.uid]);

  const handleLike = async () => {
    if (pending || !loggedIn) return;
    setPending(true);
    if (liked) {
      setLikes(likes?.filter((like) => like?.uid !== user?.uid));
    } else {
      setLikes([...likes, { uid: user?.uid }]);
    }
    setLiked(!liked);
    await likeComment(photo?.photoId, comment?.commentId, user?.uid, liked);
    setPending(false);
  };

  return (
    <button
      onClick={handleLike}
      className="ml-auto cursor-pointer transition-opacity hover:opacity-50"
    >
      {!liked ? <IoMdHeartEmpty /> : <IoMdHeart className="text-red" />}
    </button>
  );
}
