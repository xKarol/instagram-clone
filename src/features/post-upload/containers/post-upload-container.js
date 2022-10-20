import PostUploadBoxContainer from "./post-upload-box";
import { Modal } from "../../../components/modal";
import { PostUploadContextProvider, PostUploadContext } from "../context";

const PostUploadContainer = ({ setShow, show }) => {
  return (
    <>
      <PostUploadContextProvider show={show} setShow={setShow}>
        <PostUploadContext.Consumer>
          {({ blockClose }) => (
            <Modal
              show={show}
              setShow={setShow}
              element={<PostUploadBoxContainer />}
              onClose={blockClose}
            />
          )}
        </PostUploadContext.Consumer>
      </PostUploadContextProvider>
    </>
  );
};

export default PostUploadContainer;
