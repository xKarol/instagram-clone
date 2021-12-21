import { useContext } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
export default function Home() {
  const user = useContext(UserContext);
  return (
    <>
      <Header user={user} />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-[1fr_300px]">
          <div className="flex border border-blue">
            {/* Stories */}
            {/* Timeline */}
          </div>
          <Suggestions user={user} />
        </div>
      </div>
    </>
  );
}
