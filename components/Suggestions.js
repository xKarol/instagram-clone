import { useEffect, useRef } from "react";
import SuggestedProfile from "./SuggestedProfile";
import Avatar from "./Avatar";

export default function Suggestions({ user, feedRef }) {
  const sideBoxRef = useRef(null);

  useEffect(() => {
    const checkResize = () => {
      sideBoxRef.current.style.left = `${
        feedRef.current.offsetWidth + feedRef.current.offsetLeft + 10
      }px`;
    };
    checkResize();
    window.addEventListener("resize", checkResize);
    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, [feedRef]);
  
  return (
    <div
      className="fixed w-[300px] right-0 top-[90px] left-[700px]"
      ref={sideBoxRef}
    >
      <div className="h-[100px] flex items-center gap-[25px] text-[14px]">
        <Avatar src={user?.avatar} size={55} />
        <div className="flex flex-col leading-[20px]">
          <span className="font-medium">karol</span>
          <span className="text-gray-300">Karol Piskorz</span>
        </div>
        <button className="ml-auto text-blue font-medium text-[12px]">
          Switch
        </button>
      </div>
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
    </div>
  );
}
