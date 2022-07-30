import { useState, useCallback } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { FaPhotoVideo } from "react-icons/fa";
import { usePostUploadContext } from "../../../context/PostUploadContext";
import { CROP_PAGE } from "../../../constants/globals";
import Error from "../../../components/upload/Error";
import { hasExtension } from "../../../utils";

const PostUploadPageContainer = () => {
  const [error, setError] = useState(false);
  const {
    dispatch,
    state: { files },
  } = usePostUploadContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      dispatch({ files: file });
      if (!hasExtension(file.type, ["image/jpeg", "image/png"])) {
        return setError(true);
      }

      dispatch({ page: CROP_PAGE });
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    noClick: true,
  });

  const handleClick = () => getInputProps().ref.current.click();

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "h-full w-screen sm:w-[400px] max-w-[400px] mx-auto flex flex-col items-center justify-center gap-[15px]",
        isDragActive && "bg-gray-100"
      )}
    >
      {error ? (
        <Error
          caption={<p className="text-[20px]">This file is not supported</p>}
          info={
            <p className="text-[13px] text-gray-300">
              <b>{files.name}</b> could not be uploaded.
            </p>
          }
        />
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
    </div>
  );
};

export default PostUploadPageContainer;
