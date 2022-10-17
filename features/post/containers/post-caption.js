import { useState } from "react";
import { MAX_CAPTION } from "../../../constants/post";
import { usePostContext } from "../../../context/post-context";
import { truncate } from "../../../utils";
import { PostUsername } from "../components";

const PostCaptionContainer = ({ show = false }) => {
  const [showMore, setShowMore] = useState(show);
  const {
    photo: {
      caption,
      user: { username },
    },
  } = usePostContext();

  return (
    <div className="w-full text-[14px] flex leading-[15px]">
      <h3 className="font-medium break-all">
        <PostUsername>{username}</PostUsername>
        {caption && (
          <>
            &nbsp;
            <span className="font-normal">
              {showMore ? caption : truncate(caption, MAX_CAPTION)}
            </span>
            &nbsp;
            {!showMore && caption.length > MAX_CAPTION && (
              <span
                className="text-gray-300 font-normal cursor-pointer"
                onClick={() => setShowMore(true)}
              >
                more
              </span>
            )}
          </>
        )}
      </h3>
    </div>
  );
};

export default PostCaptionContainer;
