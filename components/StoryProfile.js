import Avatar from "./Avatar";

export default function StoryProfile({ active, username, avatar }) {
  return (
    <div className="flex flex-col items-center justify-center text-[14px] shrink-0 leading-[15px]">
      <div className={`p-[3px] ${active && "storyBorder"}`}>
        <div className="p-[2px] bg-white rounded-full">
          <Avatar src={avatar} size={50} />
        </div>
      </div>
      <span>{username}</span>
    </div>
  );
}
