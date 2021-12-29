import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { validFileExtensions } from "../../constants/arrays";
import { checkFileExtension } from "../../services/utils";
import { CROP_PAGE } from "../../constants/globals";
import Error from "./Error";
import Progress from "../Progress";
import UploadContext from "../../context/UploadContext";

export default function UploadBox() {
  const { error, setError, setFiles, setPreviewFiles, setPage } =
    useContext(UploadContext);

  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    const checkFilesData = checkFileExtension(e.target.files);
    setFiles(checkFilesData);
    setError({});
    //todo asynchroniczna petla aby nie dawac setpage w petli?? sprawdzic czy sie da zrobic
    checkFilesData.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setPreviewFiles((prevData) => [...prevData, reader.result]);
      });
      reader.addEventListener("progress", function ({ loaded, total }) {
        setProgress((loaded / total) * 100);
        console.log((loaded / total) * 100);
      });
      reader.readAsDataURL(file);
      setPage(CROP_PAGE);
    });
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
      setFiles({});
    } else {
      setError({});
      setFiles(checkFilesData);
      //add fileList to input
      let list = new DataTransfer(),
        file;
      checkFilesData.forEach(
        ({ name, type, lastModified, size, lastModifiedDate }) => {
          file = new File([""], name, {
            type: type,
            lastModified: lastModified,
            size: size,
            lastModifiedDate: lastModifiedDate,
          });
          list.items.add(file);
        }
      );
      fileRef.current.files = list.files;
      // fileRef.current.value = null; //trigger on change
      console.log(fileRef.current.files);
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
    <section
      className={`h-full w-[425px] mx-auto flex flex-col items-center justify-center gap-[15px] ${
        isDragging && "bg-gray-100"
      }`}
    >
      {progress !== 0 && <Progress value={progress} className={"absolute top-[45px] left-0 right-0"}/>}
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
            className={`text-[100px] ${isDragging && "text-blue"}`}
          />
          <span className="text-[20px] text-center pointer-events-none">
            Drag photos and videos here
          </span>
        </>
      )}
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
  );
}
