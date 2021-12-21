import { useContext } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
import Stories from "../components/Stories";
export default function Home() {
  const user = useContext(UserContext);
  return (
    <>
      <Header user={user} />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-[1fr_300px]">
          <div className="flex flex-col border border-blue">
            <Stories user={user} />
            {/* Timeline */}
          </div>
          <Suggestions user={user} />
        </div>
      </div>
    </>
  );
}
