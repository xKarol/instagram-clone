import { useState, useContext } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { addComment } from "../../services/firebase";
import UserContext from "../../context/UserContext";
import PhotoContext from "../../context/PhotoContext";
import Loading from "../Loading";
import { trimSpace } from "../../services/utils";
import { serverTimestamp } from "firebase/firestore";

export default function AddComment() {
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const { user, loggedIn } = useContext(UserContext);
  const { photo, setComments } = useContext(PhotoContext);
  const disabled = !comment.length || !loggedIn;

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const addNewComment = async (e) => {
    e.preventDefault();
    if (disabled || pending || !loggedIn) return;
    setPending(true);
    const res = await addComment(
      trimSpace(comment),
      photo.photoId,
      user?.username
    );
    setComments((prevState) => [
      {
        commentId: res.id,
        comment: trimSpace(comment),
        username: user?.username,
        avatar: user?.avatar,
        timestamp: serverTimestamp(),
      },
      ...prevState,
    ]);
    setComment("");
    setPending(false);
  };

  return (
    <section className="w-full px-[16px] py-[12px] flex items-center border border-transparent border-t-gray-200">
      <button
        aria-label="post emoticons"
        className="text-[22px] cursor-pointer mr-[15px]"
      >
        <BsEmojiSmile />
      </button>
      <form
        className={`flex items-center flex-1 ${!!pending && "opacity-50"}`}
        onSubmit={(e) => addNewComment(e)}
      >
        <div className="flex-1 text-[14px] relative">
          {!!pending && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loading />
            </div>
          )}
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => handleComment(e)}
          />
        </div>
        <button
          aria-label="add comment"
          className="text-blue bg-transparent font-medium text-[14px] cursor-pointer disabled:cursor-default disabled:opacity-50"
          disabled={disabled}
        >
          Post
        </button>
      </form>
    </section>
  );
}
