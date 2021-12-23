import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
import Stories from "../components/Stories";
import Modal from "../components/Modal";
import Upload from "../components/upload";

export default function Home() {
  const [show, setShow] = useState(false);
  const user = useContext(UserContext);
  const feedRef = useRef(null);

  return (
    <>
      <Header user={user} setShow={setShow} />
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
      <Modal show={show} setShow={setShow} element={<Upload />} />
    </>
  );
}
