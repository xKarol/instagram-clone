import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useUserContext } from "../../../context/user-context";
import { db } from "../../../config/firebase.config";
import { likePost } from "../../../services";
import type {
  PostType,
  PostLikesType,
  PostCommentType,
} from "../../../@types/posts";

type PostContextType = {
  photo: PostType;
  liked: boolean;
  setComments: React.Dispatch<React.SetStateAction<PostCommentType[]>>;
  comments: PostCommentType[];
  setLikes: React.Dispatch<React.SetStateAction<PostLikesType>>;
  likes: PostLikesType;
  handleLike: () => Promise<void>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
};

export const PostContext = createContext<PostContextType>(null);
export const usePostContext = () => useContext(PostContext);

type Props = React.PropsWithChildren & { photo: PostType };

const PostContextProvider = ({ children, photo }: Props) => {
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
