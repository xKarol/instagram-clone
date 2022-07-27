import { useState, useContext, useEffect, useRef } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { validFileExtensions } from "../../constants/arrays";
import { checkFileExtension } from "../../utils";
import { CROP_PAGE } from "../../constants/globals";
import Error from "./Error";
import ProgressBar from "../progress-bar";
import UploadContext from "../../context/UploadContext";
import clsx from "clsx";

export default function UploadBox() {
  const {
    state: { error, files, previewFiles },
    dispatch,
  } = useContext(UploadContext);

  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reader = new FileReader();
    const handleLoad = () => {
      dispatch({ previewFiles: [...previewFiles, reader.result] });
    };
    const handleProgress = ({ loaded, total }) => {
      const progress = (loaded / total) * 100;
      setProgress(progress);
      progress >= 100 && dispatch({ page: CROP_PAGE });
    };
    if (files.length) {
      reader.addEventListener("load", handleLoad);
      reader.addEventListener("progress", handleProgress);
      reader.readAsDataURL(files[0]);
    }
    return () => {
      reader.removeEventListener("load", handleLoad);
      reader.removeEventListener("progress", handleProgress);
    };
  }, [files, dispatch, previewFiles]);

  const handleUpload = (inputFiles) => {
    if (error?.file) return;
    const checkFilesData = checkFileExtension(inputFiles);
    dispatch({ files: checkFilesData });
    dispatch({ error: {} });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleDrop = (e) => {
      e.preventDefault();
      if (error?.file) return;
      const filesData = e.dataTransfer.files;
      const checkFilesData = checkFileExtension(filesData);
      if (filesData.length != checkFilesData.length) {
        const invalidFile = Object.values(filesData).filter(
          (file) => !validFileExtensions.includes(file.name.split(".").pop())
        )[0];
        dispatch({ error: { file: invalidFile?.name } });
        dispatch({ files: [] });
      } else {
        dispatch({ error: {} });
        dispatch({ files: checkFilesData });
      }
      setIsDragging(false);
    };

    document.addEventListener("dragover", (e) => handleDragOver(e));
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("drop", (e) => handleDrop(e));
    return () => {
      document.removeEventListener("dragover", (e) => handleDragOver(e));
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("drop", (e) => handleDrop(e));
    };
  }, [error?.file, dispatch]);

  return (
    <section
      className={clsx(
        "h-full w-screen sm:w-[400px] max-w-[400px] mx-auto flex flex-col items-center justify-center gap-[15px]",
        isDragging && "bg-gray-100"
      )}
    >
      {progress !== 0 && (
        <ProgressBar
          value={progress}
          className={"absolute top-[45px] left-0 right-0"}
        />
      )}
      {error?.file ? (
        <Error
          caption={<p className="text-[20px]">This file is not supported</p>}
          info={
            <p className="text-[13px] text-gray-300">
              <b>{error?.file}</b> could not be uploaded.
            </p>
          }
        />
      ) : (
        <>
          <FaPhotoVideo
            className={clsx(
              "pointer-events-none text-[100px]",
              isDragging && "text-blue"
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
          isDragging && "pointer-events-none"
        )}
        onClick={() => fileRef.current.click()}
      >
        {error?.file ? "Select other files" : "Select from computer"}
      </button>
      <input
        type="file"
        hidden
        multiple
        accept="image/png, image/jpg, image/jpeg"
        ref={fileRef}
        onChange={(e) => handleUpload(e.target.files)}
      />
    </section>
  );
}
