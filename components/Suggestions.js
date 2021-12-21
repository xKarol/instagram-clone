import SuggestedProfile from "./SuggestedProfile";
import Avatar from "./Avatar";

export default function Suggestions({ user }) {
  return (
    <div className="w-full">
      <div className="h-[100px] flex items-center gap-[25px] text-[14px]">
        <Avatar src={user?.avatar} size={60} />
        <div className="flex flex-col leading-[25px]">
          <span className="font-medium">karol</span>
          <span className="text-gray-300">Karol Piskorz</span>
        </div>
        <button className="ml-auto text-blue font-medium">Switch</button>
      </div>
      <div className="flex flex-col">
        <div className="flex mb-[15px]">
          <h1 className="font-medium text-gray-300 text-[14px]">
            Suggestions for you
          </h1>
          <button className="ml-auto font-medium text-[12px]">See All</button>
        </div>
        <ul className="flex flex-col">
          <SuggestedProfile avatar={null} username={"karol"} />
          <SuggestedProfile avatar={null} username={"karol"} />
          <SuggestedProfile avatar={null} username={"karol"} />
          <SuggestedProfile avatar={null} username={"karol"} />
          <SuggestedProfile avatar={null} username={"karol"} />
        </ul>
      </div>
    </div>
  );
}
