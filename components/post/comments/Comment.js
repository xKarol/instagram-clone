import { useContext } from "react";
import Link from "next/link";
import Avatar from "../../Avatar";
import CommentContext from "../../../context/CommentContext";
import Like from "./Like";

export default function Comment() {
  const comment = useContext(CommentContext);

  return (
    <div className="w-full text-[14px] flex leading-[15px] mb-[4px] justify-between py-[3px]">
      <div className="space-x-[15px] flex">
        <Link href={`/${comment?.username}`}>
          <a className="w-[30px] h-[30px] rounded-full">
            <Avatar src={comment?.avatar} />
          </a>
        </Link>
        <span className="font-medium">
          <Link href={`/${comment?.username}`}>
            <a className="hover:underline">{comment?.username}</a>
          </Link>
          &nbsp;
          <span className="font-normal">{comment?.comment}</span>
        </span>
      </div>
      <Like />
    </div>
  );
}
