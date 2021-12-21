import Avatar from "./Avatar";

export default function StoryProfile({ active }) {
  return (
    <div className="flex flex-col items-center justify-center text-[14px] shrink-0">
      <div className={`p-[3px] ${active && "storyBorder"}`}>
        <div className="p-[2px] bg-white rounded-full">
          <Avatar src={null} size={50} />
        </div>
      </div>
      <span>karol</span>
    </div>
  );
}
