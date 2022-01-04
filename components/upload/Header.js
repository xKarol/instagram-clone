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
  const {
    state: { error, page, uploaded },
    dispatch,
    setShowDiscardBox,
  } = useContext(UploadContext);
  const menuTitle = ["Create new post", "Crop", "Create new post", "Sharing"];

  const handleNextPage = () => {
    page < SHARE_PAGE && dispatch({ page: page + 1 });
  };

  const handlePrevPage = () => {
    if (page === CROP_PAGE) {
      return setShowDiscardBox(true);
    }
    page > MAIN_PAGE && dispatch({ page: page - 1 });
  };

  return (
    <header className="w-full h-[45px] py-[9px] font-medium border border-transparent border-b-gray-200 flex items-center justify-between relative">
      <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        {error?.file ? (
          "File couldn't be uploaded"
        ) : (
          <>{uploaded ? "Post shared" : menuTitle[page]}</>
        )}
      </span>
      {page != MAIN_PAGE && page !== SHARE_PAGE && (
        <>
          <button
            className="ml-[15px] text-[25px] cursor-pointer"
            onClick={handlePrevPage}
          >
            <BsArrowLeft />
          </button>
          <button
            className="text-blue bg-transparent text-[14px] font-medium mr-[15px]"
            onClick={handleNextPage}
          >
            {page === CREATE_PAGE ? "Share" : "Next"}
          </button>
        </>
      )}
    </header>
  );
}
