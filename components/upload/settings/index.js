import { useState, useContext } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Avatar from "../../Avatar";
import { MAX_POST_CAPTION } from "../../../constants/post";
import UploadContext from "../../../context/UploadContext";
import UserContext from "../../../context/UserContext";
import Button from "./Button";

export default function () {
  const [photoCaption, setPhotoCaption] = useState("");
  const {
    state: { caption },
    dispatch,
  } = useContext(UploadContext);
  const { user } = useContext(UserContext);

  const handleCaption = (e) => {
    const text = e.target.value;
    if (text.length >= MAX_POST_CAPTION) return;
    setPhotoCaption(text.replace(/  +/g, " ")); //double space block
  };

  const handleBlur = () => {
    dispatch({ caption: photoCaption });
  };

  return (
    <section className="flex flex-col border border-transparent border-l-gray-200 h-full min-w-[350px] overflow-y-scroll">
      <header className="p-[15px] flex space-x-[10px] items-center font-medium">
        <div className="w-[30px] h-[30px]">
          <Avatar src={user?.avatar} />
        </div>
        <span>{user?.username}</span>
      </header>
      <textarea
        autoComplete="off"
        placeholder="Write a caption..."
        className="px-[15px] outline-none min-h-[180px] resize-none"
        value={photoCaption}
        onChange={(e) => handleCaption(e)}
        onBlur={handleBlur}
      />
      <div className="flex items-center justify-between px-[15px] my-[10px] text-gray-300">
        <BsEmojiSmile className="text-[18px] cursor-pointer" />
        <span className="text-[12px] cursor-default transition-colors hover:text-black">
          {caption.length}/{MAX_POST_CAPTION}
        </span>
      </div>
      <div className="flex border border-transparent border-t-gray-200">
        <div className="relative w-[calc(100%-15px)] mx-auto flex">
          <input
            type="text"
            className="w-full px-[10px] h-[40px]"
            placeholder="Add location"
          />
          <GoLocation className="absolute text-[16px] right-[5px] top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      <Button>Accessibility</Button>
      <Button>Advanced Settings</Button>
    </section>
  );
}