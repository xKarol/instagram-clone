import Avatar from "../Avatar";

export default function StoryProfile({ active, username, avatar }) {
  return (
    <div className="flex flex-col items-center justify-center text-[14px] max-w-[58px] shrink-0 leading-[25px]">
      <div className={`p-[2px] ${active && "storyBorder"}`}>
        <div className="p-[2px] bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center">
          <Avatar src={avatar} size={50} />
        </div>
      </div>
      <span className="text-[12px] w-full text-center truncate">{username}</span>
    </div>
  );
}
