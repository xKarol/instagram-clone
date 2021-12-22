import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
import Stories from "../components/Stories";
import Modal from "../components/Modal";
import { FaPhotoVideo } from "react-icons/fa";

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
      <Modal
        show={show}
        setShow={setShow}
        element={
          <div className="w-[300px] sm:w-[400px] h-[350px] sm:h-[450px] relative transition-all ease-in-out delay-300">
            <header className="w-full py-[9px] font-medium border border-transparent border-b-gray-200 flex justify-center">
              Create new post
            </header>
            <section className="flex flex-col items-center justify-center absolute inset-0 gap-[15px]">
              <FaPhotoVideo className="text-[100px]" />
              <span className="text-gray-300 text-[20px] text-center">
                Drag photos and videos here
              </span>
              <button className="bg-blue text-white px-[10px] py-[5px] rounded-[5px] font-medium text-[14px]">
                Select from computer
              </button>
            </section>
          </div>
        }
      />
    </>
  );
}
