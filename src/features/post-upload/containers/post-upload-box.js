import Head from "next/head";
import { Modal } from "../../../components/modal";
import { PostUploadBox } from "../components";
import { usePostUploadContext } from "../context";
import {
  PostUploadBodyContainer,
  PostUploadDiscardBoxContainer,
  PostUploadHeaderContainer,
} from ".";

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
      <Modal show={showDiscardBox} setShow={setShowDiscardBox} hideCloseIcon>
        <PostUploadDiscardBoxContainer />
      </Modal>
    </>
  );
};

export default PostUploadBoxContainer;
