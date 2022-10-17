import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import Loading from "../../../components/loading";
import { db } from "../../../config/firebase.config";
import { usePostContext } from "../../../context/post-context";
import { useUserContext } from "../../../context/user-context";
import { addComment } from "../../../services";
import { trimSpace } from "../../../utils";
import {
  PostCommentButton,
  PostCommentEmote,
  PostCommentForm,
  PostCommentInput,
} from "../components";

const PostCommentFormContainer = () => {
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const [, setError] = useState(false);
  const { user, loggedIn } = useUserContext();
  const {
    photo: { photoId },
    setComments,
  } = usePostContext();
  const disabled = comment.length === 0 || !loggedIn;

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
    <PostCommentForm
      onSubmit={handleSubmit}
      pending={pending}
      data-testid="post-add-comment"
    >
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
