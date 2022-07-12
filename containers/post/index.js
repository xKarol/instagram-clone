import { useContext, useLayoutEffect, useState } from "react";
import { default as Container } from "../../components/post/PostContainer";
import Link from "next/link";
import PostBody from "../../components/post/PostBody";
import PhotoContext from "../../context/PhotoContext";
import PostCommentFormContainer from "./PostCommentForm";
import PostActionsContainer from "./PostActions";
import PostCommentContainer from "./PostComment";
import PostCaptionContainer from "./PostCaption";
import PostImageContainer from "./PostImage";
import UserContext from "../../context/UserContext";
import { likePost } from "../../services/firebase";
import { db } from "../../config/firebase.config";
import PostHeaderContainer from "./PostHeader";
import PostDateContainer from "./PostDate";
import PostLikesContainer from "./PostLikes";

const PostContainer = ({ data: photo, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState(photo.comments ?? []);
  const [likes, setLikes] = useState(photo.likes ?? []);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const { photoId } = photo;
  const {
    user: { uid: userId },
    loggedIn,
  } = useContext(UserContext);

  useLayoutEffect(() => {
    setLiked(
      photo.likes.findIndex((like) => like.uid === userId) === -1 ? false : true
    );
  }, [photo.likes, userId]);

  const handleLike = async () => {
    if (pending || !loggedIn) return;
    try {
      setPending(true);
      setError(false);
      if (liked) {
        setLikes(likes.filter((like) => like.uid !== userId));
      } else {
        setLikes([...likes, { uid: userId }]);
      }
      setLiked(!liked);
      await likePost(db, photoId, userId, liked);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        photo,
        liked,
        setLiked,
        setComments,
        setLikes,
        likes,
        handleLike,
        setShowModal,
        showModal,
      }}
    >
      <Container {...props} data-cy="post">
        <PostHeaderContainer />
        <PostImageContainer />
        <div className="px-[16px]">
          <PostActionsContainer />
          <PostBody>
            <PostLikesContainer />
            <PostCaptionContainer />
            {!!comments.length && (
              <Link href={`post/${photoId}`}>
                <a className="text-[14px] text-gray-300">
                  View all {comments.length} comments
                </a>
              </Link>
            )}
            <ul>
              {comments.map((props) => (
                <PostCommentContainer key={props.commentId} {...props} />
              ))}
            </ul>
            <PostDateContainer />
          </PostBody>
        </div>
        <PostCommentFormContainer />
      </Container>
    </PhotoContext.Provider>
  );
};

export default PostContainer;