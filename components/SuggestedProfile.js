import Avatar from "./Avatar";

export default function SuggestedProfile({avatar, username}) {
  return (
    <li className="flex items-center text-[14px] gap-[15px] py-[5px]">
      <Avatar src={avatar} size={30} />
      <div className="flex flex-col leading-[20px]">
        <span>{username}</span>
        <span className="text-gray-300 text-[12px]">
          Followed by karol + 2 more
        </span>
      </div>
      <button className="ml-auto text-blue font-medium">Follow</button>
    </li>
  );
}
