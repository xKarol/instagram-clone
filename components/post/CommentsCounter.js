import Link from "next/link";
import { useContext } from "react";
import PhotoContext from "../../context/PhotoContext";

export default function CommentsCounter() {
  const { photo } = useContext(PhotoContext);

  return (
    <>
      {!!photo?.comments?.length && (
        <Link href={`post/${photo?.photoId}`}>
          <a className="text-[14px] text-gray-300 mb-[5px] mt-[5px]">
            <span className="cursor-pointer">
              View all {photo.comments.length} comments
            </span>
          </a>
        </Link>
      )}
    </>
  );
}
