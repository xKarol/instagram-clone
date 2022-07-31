import {
  MAIN_PAGE,
  CROP_PAGE,
  CREATE_PAGE,
  SHARE_PAGE,
} from "../../constants/globals";
import { usePostUploadContext } from "../../context/PostUploadContext";
import {
  PostUploadPageContainer,
  PostUploadCropPageContainer,
  PostUploadDetailsPageContainer,
  PostUploadSharePageContainer,
} from "./pages";

const PostUploadBodyContainer = () => {
  const {
    state: { page: currentPage },
  } = usePostUploadContext();

  const pages = {
    [MAIN_PAGE]: <PostUploadPageContainer />,
    [CROP_PAGE]: <PostUploadCropPageContainer />,
    [CREATE_PAGE]: <PostUploadDetailsPageContainer />,
    [SHARE_PAGE]: <PostUploadSharePageContainer />,
  };

  return (
    <section className="flex h-[calc(100%-45px)] flex-col sm:flex-row">
      {pages[currentPage]}
    </section>
  );
};

export default PostUploadBodyContainer;
