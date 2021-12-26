import Avatar from "./Avatar";

export default function SuggestedProfile({ avatar, username }) {
  return (
    <li className="flex items-center text-[14px] gap-[15px] py-[5px]">
      <Avatar src={avatar} size={30} />
      <div className="flex flex-col leading-[20px] font-medium">
        <span>{username}</span>
        <span className="text-gray-300 text-[12px] font-normal">Popular</span>
      </div>
      <button className="ml-auto text-blue font-medium text-[12px]">
        Follow
      </button>
    </li>
  );
}
