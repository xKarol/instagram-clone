import clsx from "clsx";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import type { PostCommentType } from "../../../@types/posts";
import { Avatar } from "../../../components/avatar";
import { db } from "../../../config/firebase.config";
import { useUserContext } from "../../../context/user-context";
import { PostComment, PostCommentLike, PostUsername } from "../components";
import { usePostContext } from "../context";
import { likeComment } from "../services";

type Props = PostCommentType & {
  className?: string;
  showAvatar: boolean;
};

const PostCommentContainer = ({
  username,
  comment,
  likes: commentLikes,
  commentId,
  avatar,
  showAvatar = false,
  className,
}: Props) => {
  const [pending, setPending] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(commentLikes ?? []);
  const {
    user: { uid: userId },
    loggedIn,
  } = useUserContext();
  const {
    photo: { photoId },
  } = usePostContext();

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
    <PostComment className={clsx("flex", className)}>
      {showAvatar && (
        <Link href={`/${username}`}>
          <a>
            <Avatar
              src={avatar}
              size={30}
              className="mr-[15px]"
              alt={`${username}'s avatar`}
            />
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
