import { useState, useEffect, useRef } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { validFileExtensions } from "../constants/arrays";
import { checkFileExtension } from "../services/utils";
export default function Upload() {
  const fileRef = useRef(null);
  const [error, setError] = useState({});
  const [files, setFiles] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = (e) => {
    const checkFilesData = checkFileExtension(e.target.files);
    console.log(checkFilesData);
    setFiles(checkFilesData);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const filesData = e.dataTransfer.files;
    const checkFilesData = checkFileExtension(filesData);
    if (filesData.length != checkFilesData.length) {
      const invalidFile = Object.values(filesData).filter(
        (file) => !validFileExtensions.includes(file.name.split(".").pop())
      )[0];
      setError({ file: invalidFile?.name });
    } else {
      setFiles(checkFilesData);
    }
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("dragover", (e) => handleDragOver(e));
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("drop", (e) => handleDrop(e));
    return () => {
      document.removeEventListener("dragover", (e) => handleDragOver(e));
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("drop", (e) => handleDrop(e));
    };
  }, []);

  return (
    <div className="w-[300px] sm:w-[400px] h-[350px] sm:h-[450px] relative transition-all ease-in-out delay-300">
      <header className="w-full h-[45px] py-[9px] font-medium border border-transparent border-b-gray-200 flex justify-center">
        {error?.file ? "File couldn't be uploaded" : "Create new post"}
      </header>
      <section
        className={`flex flex-col items-center justify-center absolute inset-0 top-[45px] gap-[15px] ${
          isDragging && "bg-gray-100"
        }`}
      >
        <div
          className={`text-[100px] pointer-events-none ${
            isDragging && "text-blue"
          }`}
        >
          {error?.file ? <AiOutlineExclamationCircle /> : <FaPhotoVideo />}
        </div>
        <span className="text-[20px] text-center pointer-events-none">
          {error?.file ? (
            <div className="flex flex-col">
              <p>This file is not supported</p>
              <p className="text-[13px] text-gray-300">
                <b>{error?.file}</b> could not be uploaded.
              </p>
            </div>
          ) : (
            "Drag photos and videos here"
          )}
        </span>
        <button
          className={`bg-blue text-white px-[10px] py-[5px] rounded-[5px] font-medium text-[14px] ${
            isDragging && "pointer-events-none"
          }`}
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
          onChange={(e) => handleUpload(e)}
        />
      </section>
    </div>
  );
}
