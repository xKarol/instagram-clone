import { useContext, useLayoutEffect, useState } from "react";
import { default as Container } from "../../components/post/PostContainer";
import PostHeader from "../../components/post/PostHeader";
import PostIcon from "../../components/post/PostIcon";
import Avatar from "../../components/Avatar";
import Link from "next/link";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PostBody from "../../components/post/PostBody";
import PostText from "../../components/post/PostText";
import PostDate from "../../components/post/PostDate";
import PostUsername from "../../components/post/PostUsername";
import PhotoContext from "../../context/PhotoContext";
import PostCommentFormContainer from "./PostCommentForm";
import PostActionsContainer from "./PostActions";
import PostCommentContainer from "./PostComment";
import Modal from "../../components/modal";
import PostCaptionContainer from "./PostCaption";
import PostImageContainer from "./PostImage";
import UserContext from "../../context/UserContext";
import { likePost } from "../../services/firebase";
import { db } from "../../config/firebase.config";
import PostMenuContainer from "./PostMenu";

const PostContainer = ({ data: photo, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState(photo.comments ?? []);
  const [likes, setLikes] = useState(photo.likes ?? []);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const { photoId, user, timestamp } = photo;
  const { username } = user;
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
        <PostHeader>
          <Link href={`/${username}`}>
            <a className={"mr-[15px]"}>
              <Avatar src={user.avatar} size={30} />
            </a>
          </Link>
          <PostUsername>{username}</PostUsername>
          <PostIcon
            aria-label="post config"
            onClick={() => setShowModal(true)}
            className="ml-auto text-[25px]"
          >
            <HiOutlineDotsHorizontal />
          </PostIcon>
        </PostHeader>

        <PostImageContainer />
        <div className="px-[16px]">
          <PostActionsContainer />

          <PostBody>
            <PostText data-cy="post-likes-amount">
              {likes.length}
              &nbsp;
              {likes.length === 1 ? "like" : "likes"}
            </PostText>
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
            <PostDate>{timestamp?.toDate()}</PostDate>
          </PostBody>
        </div>
        <PostCommentFormContainer />
      </Container>
      <Modal
        show={showModal}
        setShow={setShowModal}
        closeHide
        element={<PostMenuContainer />}
      />
    </PhotoContext.Provider>
  );
};

export default PostContainer;
