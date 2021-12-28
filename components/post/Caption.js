import { useState } from "react";
import { MAX_CAPTION } from "../../constants/post";
import { truncate } from "../../services/utils";

export default function Caption({ username, caption }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      {caption && (
        <div className="w-full text-[14px] max-h-[40px] flex leading-[15px]">
          <span className="font-medium">
            {username}
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
          </span>
        </div>
      )}
    </>
  );
}
