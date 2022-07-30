import Crop from "../../components/upload/crop";
import Details from "../../components/upload/settings";
import UploadBox from "../../components/upload/UploadBox";
import Share from "../../components/upload/Share";
import {
  MAIN_PAGE,
  CROP_PAGE,
  CREATE_PAGE,
  SHARE_PAGE,
} from "../../constants/globals";
import { usePostUploadContext } from "../../context/PostUploadContext";

const PostUploadBodyContainer = () => {
  const {
    state: { page: currentPage, previewFiles },
  } = usePostUploadContext();

  const pages = {
    [MAIN_PAGE]: <UploadBox />,
    [CROP_PAGE]: <Crop src={previewFiles} />,
    [CREATE_PAGE]: (
      <>
        <Crop src={previewFiles} disableBtns />
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
