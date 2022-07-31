import { useState } from "react";
import Image from "next/image";
import { usePostUploadContext } from "../../../context/PostUploadContext";
import { useUserContext } from "../../../context/UserContext";
import { BsEmojiSmile } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MAX_POST_CAPTION } from "../../../constants/post";
import { removeDoubleSpace } from "../../../utils";
import Avatar from "../../../components/avatar";
import {
  PostUploadAccordion,
  PostUploadPageBox,
} from "../../../components/post-upload";

const PostUploadDetailsPageContainer = () => {
  const [photoCaption, setPhotoCaption] = useState("");
  const {
    state: { previewSrc },
    dispatch,
  } = usePostUploadContext();
  const {
    user: { avatar: userAvatar, username },
  } = useUserContext();

  const handleChangeCaption = (e) => {
    const text = e.target.value;
    if (text.length > MAX_POST_CAPTION) return;
    setPhotoCaption(removeDoubleSpace(text));
  };

  const handleBlur = () => {
    dispatch({ caption: photoCaption });
  };

  return (
    <>
      <PostUploadPageBox className="relative">
        <Image src={previewSrc} layout="fill" objectFit="cover" alt="" />
      </PostUploadPageBox>

      <section className="flex flex-col border border-transparent border-l-gray-200 h-full min-w-[350px] overflow-y-scroll">
        <header className="p-[15px] flex space-x-[10px] items-center">
          <Avatar src={userAvatar} size={30} />
          <span className="font-medium">{username}</span>
        </header>
        <textarea
          autoComplete="off"
          placeholder="Write a caption..."
          className="px-[15px] outline-none min-h-[180px] resize-none"
          value={photoCaption}
          onChange={(e) => handleChangeCaption(e)}
          onBlur={handleBlur}
          data-cy="photo-upload-caption"
        />
        <div className="flex items-center justify-between px-[15px] my-[10px] text-gray-300">
          <BsEmojiSmile className="text-[18px] cursor-pointer" />
          <span
            className="text-[12px] cursor-default transition-colors hover:text-black"
            data-cy="photo-upload-caption-length"
          >
            {photoCaption.length}/{MAX_POST_CAPTION}
          </span>
        </div>
        <div className="flex border px-[15px] border-transparent border-t-gray-200">
          <div className="relative w-full flex">
            <input
              type="text"
              className="w-full h-[40px] outline-none"
              placeholder="Add location"
            />
            <GoLocation className="absolute text-[16px] right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <PostUploadAccordion heading="Accessibility">test</PostUploadAccordion>
        <PostUploadAccordion heading="Advanced Settings">
          test
        </PostUploadAccordion>
      </section>
    </>
  );
};

export default PostUploadDetailsPageContainer;
