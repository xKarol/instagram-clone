import MiniComment from "./MiniComment";
import Comment from "./Comment";
import CommentContext from "../../../context/CommentContext";
import { MINI_COMMENT, NORMAL_COMMENT } from "../../../constants/post";

export default function Comments({ comments, type = NORMAL_COMMENT }) {
  return (
    <>
      {!!comments?.length &&
        comments.slice(0, 3).map((comment) => (
          <CommentContext.Provider key={comment.commentId} value={comment}>
            {type === MINI_COMMENT ? <MiniComment /> : <Comment />}
          </CommentContext.Provider>
        ))}
    </>
  );
}
