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
        <div className="grid grid-cols-[665px_300px]">
          <div className="flex flex-col pr-[20px]" ref={feedRef}>
            <Stories user={user} />
            {/* Timeline */}
          </div>
          <Suggestions user={user} feedRef={feedRef} />
        </div>
      </div>
    </>
  );
}
