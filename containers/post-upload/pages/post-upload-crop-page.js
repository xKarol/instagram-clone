import Image from "next/image";
import { BiExpandAlt, BiZoomIn } from "react-icons/bi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { usePostUploadContext } from "../../../context/post-upload-context";
import {
  PostUploadCropButton,
  PostUploadPageBox,
} from "../../../components/post-upload";

const PostUploadCropPageContainer = ({ disableBtns = false }) => {
  const {
    state: { previewSrc },
  } = usePostUploadContext();

  return (
    <PostUploadPageBox className="relative">
      {previewSrc.length > 0 && (
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
