import { useLayoutEffect, useRef } from "react";
import Profile from "./Profile";
import SuggestionsList from "./SuggestionsList";

export default function Suggestions({ feedRef }) {
  const sideBoxRef = useRef(null);

  useLayoutEffect(() => {
    const checkResize = () => {
      const feedEl = feedRef.current;
      if (!feedEl) return;
      const offsetWidth = feedEl.offsetWidth;
      const offsetLeft = feedEl.offsetLeft;
      sideBoxRef.current.style.left = `${offsetWidth + offsetLeft + 10}px`;
    };
    checkResize();
    window.addEventListener("resize", checkResize);
    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, [feedRef]);

  return (
    <aside
      className="fixed w-[300px] right-0 top-[90px] left-[700px] z-10 hidden 1000px:block"
      ref={sideBoxRef}
    >
      <Profile />
      <SuggestionsList />
    </aside>
  );
}
