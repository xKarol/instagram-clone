import { BsEmojiSmile } from "react-icons/bs";

export default function CreateComment() {
  return (
    <div className="w-full px-[16px] py-[12px] flex items-center border border-transparent border-t-gray-200">
      <button className="text-[22px] cursor-pointer mr-[15px]">
        <BsEmojiSmile />
      </button>
      <input
        className="flex-1 text-[14px] outline-none"
        type="text"
        placeholder="Add a comment..."
      />
      <button
        className="text-blue bg-transparent font-medium text-[14px] cursor-pointer disabled:opacity-50"
        disabled
      >
        Post
      </button>
    </div>
  );
}
