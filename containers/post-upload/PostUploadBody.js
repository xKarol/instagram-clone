import Details from "../../components/upload/settings";
import Share from "../../components/upload/Share";
import {
  MAIN_PAGE,
  CROP_PAGE,
  CREATE_PAGE,
  SHARE_PAGE,
} from "../../constants/globals";
import { usePostUploadContext } from "../../context/PostUploadContext";
import { PostUploadPageContainer, PostUploadCropPageContainer } from "./pages";

const PostUploadBodyContainer = () => {
  const {
    state: { page: currentPage },
  } = usePostUploadContext();

  const pages = {
    [MAIN_PAGE]: <PostUploadPageContainer />,
    [CROP_PAGE]: <PostUploadCropPageContainer />,
    [CREATE_PAGE]: (
      <>
        <PostUploadCropPageContainer />
        <Details />
      </>
    ),
    [SHARE_PAGE]: <Share />,
  };

  return (
    <section className="flex h-[calc(100%-45px)] flex-col sm:flex-row">
      {pages[currentPage]}
    </section>
  );
};

export default PostUploadBodyContainer;
