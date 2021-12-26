import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
import Stories from "../components/Stories";
import Modal from "../components/Modal";
import Upload from "../components/upload";
import Post from "../components/post";
import { getPhotos } from "../services/firebase";

export default function Home() {
  const [show, setShow] = useState(false);
  const [photos, setPhotos] = useState([]);
  const user = useContext(UserContext);
  const feedRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      if (user.username) {
        const photos = await getPhotos();
        setPhotos(photos);
      }
    };
    getData();
  }, [user.username]);

  return (
    <>
      <Header user={user} setShow={setShow} />
      <div className="max-w-[975px] mx-auto mt-[90px]">
        <div
          className="max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]"
          ref={feedRef}
        >
          <Stories user={user} />
          {photos.map((photo, index) => (
            <Post key={index} {...photo} />
          ))}
        </div>
        <Suggestions user={user} feedRef={feedRef} />
      </div>
      <Modal show={show} setShow={setShow} element={<Upload />} />
    </>
  );
}
