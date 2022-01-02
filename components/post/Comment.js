import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import Avatar from "../Avatar";

export default function Comment({ avatar, username, comment }) {
  return (
    <div className="w-full text-[14px] flex leading-[15px] mb-[4px] justify-between">
      <div className="space-x-[15px] flex">
        <Link href={`/${username}`}>
          <a className="w-[30px] h-[30px] rounded-full">
            <Avatar src={avatar} />
          </a>
        </Link>
        <span className="font-medium">
          <Link href={`/${username}`}>
            <a className="hover:underline">{username}</a>
          </Link>
          &nbsp;
          <span className="font-normal">{comment}</span>
        </span>
      </div>
      <IoMdHeartEmpty className="ml-auto cursor-pointer transition-opacity hover:opacity-50" />
    </div>
  );
}
