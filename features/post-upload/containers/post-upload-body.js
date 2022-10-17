import {
  PostUploadCropPageContainer,
  PostUploadDetailsPageContainer,
  PostUploadPageContainer,
  PostUploadSharePageContainer,
} from "./pages";
import { CREATE_PAGE, CROP_PAGE, MAIN_PAGE, SHARE_PAGE } from "../constants";
import { usePostUploadContext } from "../context";

const pages = {
  [MAIN_PAGE]: <PostUploadPageContainer />,
  [CROP_PAGE]: <PostUploadCropPageContainer />,
  [CREATE_PAGE]: <PostUploadDetailsPageContainer />,
  [SHARE_PAGE]: <PostUploadSharePageContainer />,
};

const PostUploadBodyContainer = () => {
  const {
    state: { page: currentPage },
  } = usePostUploadContext();

  return (
    <section className="flex h-[calc(100%-45px)] flex-col sm:flex-row">
      {pages[currentPage]}
    </section>
  );
};

export default PostUploadBodyContainer;
