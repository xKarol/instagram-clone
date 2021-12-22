import { useContext, useRef } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
import Stories from "../components/Stories";
export default function Home() {
  const user = useContext(UserContext);
  const feedRef = useRef(null);

  return (
    <>
      <Header user={user} />
      <div className="max-w-[975px] mx-auto mt-[90px]">
        <div
          className="max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]"
          ref={feedRef}
        >
          <Stories user={user} />
          {/* Timeline */}
        </div>
        <Suggestions user={user} feedRef={feedRef} />
      </div>
    </>
  );
}
