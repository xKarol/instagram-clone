import { createContext, useContext, useLayoutEffect, useState } from "react";
import { db } from "../config/firebase.config";
import { likePost } from "../services";
import UserContext from "./UserContext";

export const PostContext = createContext(null);
export const usePostContext = () => useContext(PostContext);

const PostProvider = ({ children, photo }) => {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState(photo.comments ?? []);
  const [likes, setLikes] = useState(photo.likes ?? []);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const { photoId } = photo;
  const {
    user: { uid: userId },
  } = useContext(UserContext);

  useLayoutEffect(() => {
    setLiked(
      likes.findIndex((like) => like.uid === userId) === -1 ? false : true
    );
  }, [likes, userId]);

  const handleLike = async () => {
    if (pending) return;
    try {
      setPending(true);
      setError(false);
      if (liked) {
        setLikes(likes.filter((like) => like.uid !== userId));
      } else {
        setLikes([...likes, { uid: userId }]);
      }
      await likePost(db, photoId, userId, liked);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };

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

export default PostProvider;
