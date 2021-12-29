import { useContext, useState } from "react";
import { MAX_CAPTION } from "../../constants/post";
import { truncate } from "../../services/utils";
import PhotoContext from "../../context/PhotoContext";

export default function Caption({ username, caption }) {
  const [showMore, setShowMore] = useState(false);
  const { photo } = useContext(PhotoContext);

  return (
    <>
      {photo?.caption && (
        <div className="w-full text-[14px] flex leading-[15px]">
          <span className="font-medium">
            {photo?.user?.username}
            &nbsp;
            <span className="font-normal">
              {showMore
                ? photo?.caption
                : truncate(photo?.caption, MAX_CAPTION)}
            </span>
            &nbsp;
            {!showMore && photo?.caption.length > MAX_CAPTION && (
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
