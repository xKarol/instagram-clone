import Head from "next/head";
import DiscardBox from "../../components/post-upload/DiscardBox";
import Modal from "../../components/modal";
import PostUploadBox from "../../components/post-upload/PostUploadBox";
import { PostUploadHeaderContainer, PostUploadBodyContainer } from "./";
import { usePostUploadContext } from "../../context/PostUploadContext";

const PostUploadBoxContainer = () => {
  const { showDiscardBox, setShowDiscardBox } = usePostUploadContext();

  return (
    <>
      <Head>
        <title>Create new post • Instagram</title>
      </Head>
      <PostUploadBox data-cy="add-post-modal">
        <PostUploadHeaderContainer />
        <PostUploadBodyContainer />
      </PostUploadBox>
      <Modal
        show={showDiscardBox}
        setShow={setShowDiscardBox}
        element={<DiscardBox />}
        closeHide
      />
    </>
  );
};

export default PostUploadBoxContainer;
