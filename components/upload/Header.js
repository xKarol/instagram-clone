import { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import UploadContext from "../../context/UploadContext";
import {
  CREATE_PAGE,
  MAIN_PAGE,
  SHARE_PAGE,
  CROP_PAGE,
} from "../../constants/globals";

export default function Header() {
  const { error, setPage, page, setShowDiscardBox } = useContext(UploadContext);
  const menuTitle = ["Create new post", "Crop", "Create new post", "Sharing"];

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

  return (
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
  );
}
