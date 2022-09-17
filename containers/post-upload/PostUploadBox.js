import Head from "next/head";
import Modal from "../../components/modal";
import PostUploadBox from "../../components/post-upload/PostUploadBox";
import {
  PostUploadHeaderContainer,
  PostUploadBodyContainer,
  PostUploadDiscardBoxContainer,
} from "./";
import { usePostUploadContext } from "../../context/PostUploadContext";

const PostUploadBoxContainer = () => {
  const { showDiscardBox, setShowDiscardBox } = usePostUploadContext();

  return (
    <>
      <Head>
        <title>Create new post • Instagram</title>
      </Head>
      <PostUploadBox data-testid="add-post-modal">
        <PostUploadHeaderContainer />
        <PostUploadBodyContainer />
      </PostUploadBox>
      <Modal
        show={showDiscardBox}
        setShow={setShowDiscardBox}
        element={<PostUploadDiscardBoxContainer />}
        closeHide
      />
    </>
  );
};

export default PostUploadBoxContainer;
