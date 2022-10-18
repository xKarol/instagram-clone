import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useUserContext } from "../../../context/user-context";
import { db } from "../../../config/firebase.config";
import { likePost } from "../../../services";

export const PostContext = createContext(null);
export const usePostContext = () => useContext(PostContext);

const PostContextProvider = ({ children, photo }) => {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState(photo.comments ?? []);
  const [likes, setLikes] = useState(photo.likes ?? []);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const { photoId } = photo;
  const {
    user: { uid: userId },
  } = useUserContext();

  useLayoutEffect(() => {
    setLiked(
      likes.findIndex((like) => like.uid === userId) === -1 ? false : true
    );
  }, [likes, userId]);

  const handleLike = useCallback(async () => {
    if (pending || !userId) return;
    try {
      setPending(true);
      if (liked) {
        setLikes(likes.filter((like) => like.uid !== userId));
      } else {
        setLikes([...likes, { uid: userId }]);
      }
      await likePost(db, photoId, userId, liked);
    } finally {
      setPending(false);
    }
  }, [liked, likes, pending, photoId, userId]);

  return (
    <PostContext.Provider
      value={{
        photo,
        liked,
        setLiked,
        setComments,
        comments,
        setLikes,
        likes,
        handleLike,
        setShowModal,
        showModal,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
