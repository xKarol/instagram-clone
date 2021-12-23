import { useState } from "react";
import Details from "./Details";
import Crop from "./Crop";
import UploadBox from "./UploadBox";
import { MAIN_PAGE, CROP_PAGE, CREATE_PAGE } from "../../constants/globals";

export default function Upload() {
  const [error, setError] = useState({});
  const [files, setFiles] = useState("");
  const [page, setPage] = useState(0);
  const [previewFiles, setPreviewFiles] = useState([]);
  const handleNextPage = () => {
    if (page < CREATE_PAGE) {
      setPage((page) => page + 1);
    } else {
      console.log("Share");
    }
  };
  return (
    <div className="h-[400px] relative transition-all ease-in-out delay-300">
      <header className="w-full h-[45px] py-[9px] font-medium border border-transparent border-b-gray-200 flex items-center relative">
        <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          {error?.file
            ? "File couldn't be uploaded"
            : page === CROP_PAGE
            ? "Crop"
            : "Create new post"}
        </span>
        {page != MAIN_PAGE && (
          <button
            className="ml-auto text-blue bg-transparent text-[14px] font-medium mr-[15px]"
            onClick={handleNextPage}
          >
            {page === CREATE_PAGE ? "Share" : "Next"}
          </button>
        )}
      </header>
      <div className="flex h-[calc(100%-45px)] min-w-[450px]">
        {page === CREATE_PAGE ? (
          <>
            <Crop src={previewFiles} />
            <Details />
          </>
        ) : (
          <>
            {previewFiles.length ? (
              <Crop src={previewFiles} />
            ) : (
              <>
                <UploadBox
                  error={error}
                  setError={setError}
                  setFiles={setFiles}
                  setPreviewFiles={setPreviewFiles}
                  setPage={setPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
