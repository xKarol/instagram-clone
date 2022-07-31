import Image from "next/image";
import { BiExpandAlt, BiZoomIn } from "react-icons/bi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import {
  PostUploadCropButton,
  PostUploadPageBox,
} from "../../../components/post-upload";
import { usePostUploadContext } from "../../../context/PostUploadContext";

const PostUploadCropPageContainer = ({ disableBtns = false }) => {
  const {
    state: { previewSrc },
  } = usePostUploadContext();

  return (
    <PostUploadPageBox className="relative">
      {!!previewSrc.length && (
        <>
          <Image src={previewSrc} layout="fill" objectFit="cover" alt="" />
          {!disableBtns && (
            <>
              <PostUploadCropButton className={"left-[15px]"}>
                <BiExpandAlt className="text-gray-100" />
              </PostUploadCropButton>
              <PostUploadCropButton className={"left-[55px]"}>
                <BiZoomIn className="text-gray-100" />
              </PostUploadCropButton>
              <PostUploadCropButton className={"right-[15px]"}>
                <MdOutlinePhotoLibrary className="text-gray-100" />
              </PostUploadCropButton>
            </>
          )}
        </>
      )}
    </PostUploadPageBox>
  );
};

export default PostUploadCropPageContainer;
