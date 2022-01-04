import { useLayoutEffect, useRef } from "react";
import Profile from "./Profile";
import SuggestionsBox from "./Suggestions";

export default function Suggestions({ feedRef }) {
  const sideBoxRef = useRef(null);

  useLayoutEffect(() => {
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
      className="fixed w-[300px] right-0 top-[90px] left-[700px] z-10 hidden 1000px:block"
      ref={sideBoxRef}
    >
      <Profile />
      <SuggestionsBox />
    </div>
  );
}
