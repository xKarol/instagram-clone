import { useState, useCallback } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { FaPhotoVideo } from "react-icons/fa";
import { usePostUploadContext } from "../../../context/PostUploadContext";
import { CROP_PAGE } from "../../../constants/globals";
import { hasExtension } from "../../../utils";
import {
  PostUploadPageBox,
  PostUploadError,
} from "../../../components/post-upload";

const PostUploadPageContainer = () => {
  const [error, setError] = useState(false);
  const {
    dispatch,
    state: { files },
  } = usePostUploadContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return setError(true);
      dispatch({ files: file });
      const previewSrc = URL.createObjectURL(file);
      dispatch({ previewSrc: previewSrc });
      if (!hasExtension(file.type, ["image/jpeg", "image/png"])) {
        return setError(true);
      }
      dispatch({ page: CROP_PAGE });
    },
    [dispatch]
  );

  const onDropRejected = useCallback(
    (rejectedFiles) => {
      const file = rejectedFiles[0].file;
      dispatch({ files: file });
      setError(true);
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    noClick: true,
  });

  const handleClick = () => getInputProps().ref.current.click();

  return (
    <PostUploadPageBox
      {...getRootProps()}
      className={clsx("space-y-[15px]", isDragActive && "bg-gray-100")}
    >
      {error ? (
        <PostUploadError captionText="This file is not supported">
          <p className="text-[13px] text-gray-300">
            <b>{files.name ?? "File"}</b> could not be uploaded.
          </p>
        </PostUploadError>
      ) : (
        <>
          <FaPhotoVideo
            className={clsx(
              "pointer-events-none text-[100px]",
              isDragActive && "text-blue"
            )}
          />
          <span className="text-[20px] text-center pointer-events-none">
            Drag photos and videos here
          </span>
        </>
      )}
      <button
        className={clsx(
          "bg-blue text-white px-[10px] py-[5px] rounded-[5px] font-medium text-[14px]",
          isDragActive && "pointer-events-none"
        )}
        onClick={handleClick}
      >
        {error ? "Select other files" : "Select from computer"}
      </button>
      <input {...getInputProps({ multiple: false })} />
    </PostUploadPageBox>
  );
};

export default PostUploadPageContainer;
