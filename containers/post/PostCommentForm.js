import { useContext, useState } from "react";
import PostCommentForm from "../../components/post/comment/PostCommentForm";
import PostCommentInput from "../../components/post/comment/PostCommentInput";
import PostCommentButton from "../../components/post/comment/PostCommentButton";
import PostCommentEmote from "../../components/post/comment/PostCommentEmote";
import UserContext from "../../context/UserContext";
import { addComment } from "../../services/firebase";
import { db } from "../../config/firebase.config";
import { trimSpace } from "../../services/utils";
import PhotoContext from "../../context/PhotoContext";
import { serverTimestamp } from "firebase/firestore";
import Loading from "../../components/loading";

const PostCommentFormContainer = () => {
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const { user, loggedIn } = useContext(UserContext);
  const {
    photo: { photoId },
    setComments,
  } = useContext(PhotoContext);
  const disabled = !comment.length || !loggedIn;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled || pending || !loggedIn) return;
    try {
      setPending(true);
      setError(false);

      const res = await addComment(
        db,
        trimSpace(comment),
        photoId,
        user.username
      );

      setComments((prevState) => [
        {
          commentId: res.id,
          comment: trimSpace(comment),
          username: user.username,
          avatar: user.avatar,
          timestamp: serverTimestamp(),
        },
        ...prevState,
      ]);
    } catch {
      setError(true);
    } finally {
      setPending(false);
      setComment("");
    }
  };

  return (
    <PostCommentForm onSubmit={handleSubmit} pending={pending}>
      <PostCommentEmote className="mr-[15px]" type="button" />
      <PostCommentInput
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      >
        {pending && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        )}
      </PostCommentInput>
      <PostCommentButton type="submit" disabled={disabled}>
        Post
      </PostCommentButton>
    </PostCommentForm>
  );
};

export default PostCommentFormContainer;
