import { IoMdHeartEmpty } from "react-icons/io";

export default function MiniComment({ username, comment }) {
  return (
    <div className="w-full text-[14px] flex leading-[15px] mb-[4px] items-center">
      <span className="font-medium">
        {username}
        &nbsp;
        <span className="font-normal">{comment}</span>
      </span>
      <IoMdHeartEmpty className="ml-auto cursor-pointer transition-opacity hover:opacity-50" />
    </div>
  );
}
