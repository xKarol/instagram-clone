import { useContext, useState } from "react";
import { MAX_CAPTION } from "../../constants/post";
import { truncate } from "../../services/utils";
import PhotoContext from "../../context/PhotoContext";

export default function Caption() {
  const [showMore, setShowMore] = useState(false);
  const {
    photo: { caption, user },
  } = useContext(PhotoContext);
  return (
    <>
      <div className="w-full text-[14px] flex leading-[15px]">
        <span className="font-medium">
          {user?.username}
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
        </span>
      </div>
    </>
  );
}
