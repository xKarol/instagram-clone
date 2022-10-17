import { BsArrowLeft } from "react-icons/bs";
import { CREATE_PAGE, CROP_PAGE, MAIN_PAGE, SHARE_PAGE } from "../constants";
import { PostUploadHeader } from "../components";
import { usePostUploadContext } from "../context";

const menuTitles = ["Create new post", "Crop", "Create new post", "Sharing"];

const PostUploadHeaderContainer = () => {
  const {
    state: { error, page, uploaded },
    dispatch,
    setShowDiscardBox,
  } = usePostUploadContext();
  const showButtons = page != MAIN_PAGE && page !== SHARE_PAGE;

  const handleNextPage = () => {
    page < SHARE_PAGE && dispatch({ type: "SET_PAGE", payload: page + 1 });
  };

  const handlePrevPage = () => {
    if (page === CROP_PAGE) {
      return setShowDiscardBox(true);
    }
    page > MAIN_PAGE && dispatch({ type: "SET_PAGE", payload: page - 1 });
  };

  const getCenterText = () => {
    if (error) return "File couldn't be uploaded";
    if (!uploaded) return menuTitles[page];
    return "Post shared";
  };

  const LeftElement = ({ ...props }) => {
    return showButtons ? (
      <button className="text-[25px] cursor-pointer" {...props}>
        <BsArrowLeft />
      </button>
    ) : null;
  };

  const RightElement = ({ ...props }) => {
    return showButtons ? (
      <button
        className="text-blue bg-transparent text-[14px] font-medium"
        {...props}
      >
        {page === CREATE_PAGE ? "Share" : "Next"}
      </button>
    ) : null;
  };

  return (
    <PostUploadHeader
      leftElement={
        <LeftElement onClick={handlePrevPage} data-testid="photo-upload-prev" />
      }
      rightElement={
        <RightElement
          onClick={handleNextPage}
          data-testid="photo-upload-next"
        />
      }
    >
      {getCenterText()}
    </PostUploadHeader>
  );
};

export default PostUploadHeaderContainer;
