import Avatar from "../avatar";
import clsx from "clsx";

function StoriesProfile({ active, username, avatar }) {
  return (
    <li className="flex flex-col items-center justify-center text-[14px] max-w-[58px] shrink-0 leading-[25px]">
      <div className={clsx("p-[2px]", active && "storyBorder")}>
        <figure className="p-[2px] bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center">
          <Avatar src={avatar} />
        </figure>
      </div>
      <span className="text-[12px] w-full text-center truncate">
        {username}
      </span>
    </li>
  );
}

export default StoriesProfile;
