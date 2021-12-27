import SuggestedProfile from "./SuggestedProfile";

export default function Suggestions() {
  return (
    <div className="flex flex-col">
      <div className="flex mb-[5px]">
        <h1 className="font-medium text-gray-300 text-[14px]">
          Suggestions For You
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
  );
}
