import { useRef, useState } from "react";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
import Stories from "../components/stories";
import Modal from "../components/Modal";
import Upload from "../components/upload";
import Posts from "../components/post";

export default function Home() {
  const [show, setShow] = useState(false);
  const feedRef = useRef(null);

  return (
    <>
      <Header setShow={setShow} />
      <div className="max-w-[975px] mx-auto mt-[90px] pb-[50px] ">
        <div
          className="max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]"
          ref={feedRef}
        >
          <Stories />
          <Posts />
        </div>
        <Suggestions feedRef={feedRef} />
      </div>
      <Modal show={show} setShow={setShow} element={<Upload />} />
    </>
  );
}
