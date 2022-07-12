import { useContext, useLayoutEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import PostComment from "../../components/post/comment/PostComment";
import PostCommentLike from "../../components/post/comment/PostCommentLike";
import PostUsername from "../../components/post/PostUsername";
import { db } from "../../config/firebase.config";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";
import { likeComment } from "../../services/firebase";
import Link from "next/link";

const PostCommentContainer = ({
  username,
  comment,
  likes: commentLikes,
  commentId,
  avatar,
  showAvatar = false,
  className,
}) => {
  const [pending, setPending] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(commentLikes ?? []);
  const {
    user: { uid: userId },
    loggedIn,
  } = useContext(UserContext);
  const {
    photo: { photoId },
  } = useContext(PhotoContext);

  useLayoutEffect(() => {
    setLiked(
      likes.findIndex((like) => like.uid === userId) === -1 ? false : true
    );
  }, [likes, userId]);

  const handleLike = async () => {
    if (pending || !loggedIn) return;
    setPending(true);
    if (liked) {
      setLikes(likes.filter((like) => like.uid !== userId));
    } else {
      setLikes([...likes, { uid: userId }]);
    }
    setLiked(!liked);
    await likeComment(db, photoId, commentId, userId, liked);
    setPending(false);
  };

  return (
    <PostComment className={`flex ${className}`}>
      {showAvatar && (
        <Link href={`/${username}`}>
          <a>
            <Avatar src={avatar} size={30} className="mr-[15px]" />
          </a>
        </Link>
      )}
      <PostUsername>{username}</PostUsername>
      &nbsp;
      <p className="text-[14px]">{comment}</p>
      <PostCommentLike className="ml-auto" liked={liked} onClick={handleLike} />
    </PostComment>
  );
};

export default PostCommentContainer;