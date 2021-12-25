import Head from "next/head";
import { useState } from "react";
import Details from "./Details";
import Crop from "./Crop";
import UploadBox from "./UploadBox";
import Modal from "../Modal";
import Share from "./Share";
import DiscardBox from "./DiscardBox";
import { BsArrowLeft } from "react-icons/bs";
import {
  MAIN_PAGE,
  CROP_PAGE,
  CREATE_PAGE,
  SHARE_PAGE,
} from "../../constants/globals";

export default function Upload() {
  const [error, setError] = useState({});
  const [files, setFiles] = useState("");
  const [caption, setCaption] = useState("");
  const [page, setPage] = useState(0);
  const [showDiscardBox, setShowDiscardBox] = useState(false);
  const [previewFiles, setPreviewFiles] = useState([]);
  const handleNextPage = () => {
    if (page < SHARE_PAGE) {
      setPage((page) => page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page === CROP_PAGE) {
      setShowDiscardBox(true);
      return;
    }
    if (page > MAIN_PAGE) {
      setPage((page) => page - 1);
    }
  };
  const menuTitle = ["Create new post", "Crop", "Create new post", "Sharing"];
  return (
    <>
      <Head>
        <title>Create new post • Instagram</title>
        <meta name="description" content="Instagram Upload Photos" />
      </Head>
      <div className="h-[450px] relative transition-all ease-in-out delay-300">
        <header className="w-full h-[45px] py-[9px] font-medium border border-transparent border-b-gray-200 flex items-center justify-between relative">
          <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            {error?.file ? "File couldn't be uploaded" : menuTitle[page]}
          </span>
          {page != MAIN_PAGE && (
            <>
              {page !== SHARE_PAGE && (
                <BsArrowLeft
                  className="ml-[15px] text-[25px] cursor-pointer"
                  onClick={handlePrevPage}
                />
              )}
              <button
                className="text-blue bg-transparent text-[14px] font-medium mr-[15px]"
                onClick={handleNextPage}
              >
                {page !== SHARE_PAGE && (
                  <>{page === CREATE_PAGE ? "Share" : "Next"}</>
                )}
              </button>
            </>
          )}
        </header>
        <div className="flex h-[calc(100%-45px)] flex-col sm:flex-row">
          {page === MAIN_PAGE ? (
            <>
              <UploadBox
                error={error}
                setError={setError}
                setFiles={setFiles}
                setPreviewFiles={setPreviewFiles}
                setPage={setPage}
              />
            </>
          ) : page === CROP_PAGE ? (
            <>
              <Crop src={previewFiles} />
            </>
          ) : page === CREATE_PAGE ? (
            <>
              <Crop src={previewFiles} disableBtns />
              <Details caption={caption} setCaption={setCaption} />
            </>
          ) : (
            <>
              <Share files={files} caption={caption} />
            </>
          )}
        </div>
      </div>
      {showDiscardBox && (
        <Modal
          show={showDiscardBox}
          setShow={setShowDiscardBox}
          element={<DiscardBox />}
          closeHide
        />
      )}
    </>
  );
}
