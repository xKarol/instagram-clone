import Link from "next/link";
import { useContext } from "react";
import CommentContext from "../../../context/CommentContext";
import Like from "./Like";

export default function MiniComment() {
  const comment = useContext(CommentContext);
  
  return (
    <div className="w-full text-[14px] flex leading-[15px] mb-[4px] items-center">
      <span className="font-medium">
        <Link href={`/${comment?.username}`}>
          <a className="hover:underline">{comment?.username}</a>
        </Link>
        &nbsp;
        <span className="font-normal">{comment?.comment}</span>
      </span>
      <Like />
    </div>
  );
}
