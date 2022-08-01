import { BsArrowLeft } from "react-icons/bs";
import { usePostUploadContext } from "../../context/PostUploadContext";
import {
  CREATE_PAGE,
  MAIN_PAGE,
  SHARE_PAGE,
  CROP_PAGE,
} from "../../constants/globals";
import { PostUploadHeader } from "../../components/post-upload";

const PostUploadHeaderContainer = () => {
  const {
    state: { error, page, uploaded },
    dispatch,
    setShowDiscardBox,
  } = usePostUploadContext();
  const menuTitles = ["Create new post", "Crop", "Create new post", "Sharing"];
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
        <LeftElement onClick={handlePrevPage} data-cy="photo-upload-prev" />
      }
      rightElement={
        <RightElement onClick={handleNextPage} data-cy="photo-upload-next" />
      }
    >
      {getCenterText()}
    </PostUploadHeader>
  );
};

export default PostUploadHeaderContainer;
