import { useState } from "react";
import { usePostContext } from "../../context/PostContext";
import { PostUsername } from "../../components/post";
import { truncate } from "../../utils";
import { MAX_CAPTION } from "../../constants/post";

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
      <h3 className="font-medium">
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
