import { useState, useContext } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { addComment } from "../../services/firebase";
import UserContext from "../../context/UserContext";
import Loading from "../Loading";
import { trimSpace } from "../../services/utils";

export default function CreateComment({ postId }) {
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const { user } = useContext(UserContext);
  const disabled = !comment.length;

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const addNewComment = async (e) => {
    e.preventDefault();
    if (disabled || pending) return;
    setPending(true);
    await addComment(trimSpace(comment), postId, user?.username);
    setComment("");
    setPending(false);
  };

  return (
    <div className="w-full px-[16px] py-[12px] flex items-center border border-transparent border-t-gray-200">
      <button className="text-[22px] cursor-pointer mr-[15px]">
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
          className="text-blue bg-transparent font-medium text-[14px] cursor-pointer disabled:opacity-50"
          disabled={disabled}
        >
          Post
        </button>
      </form>
    </div>
  );
}
