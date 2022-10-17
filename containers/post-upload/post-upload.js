import PostUploadBoxContainer from "./post-upload-box";
import Modal from "../../components/modal";
import PostUploadProvider, {
  PostUploadContext,
} from "../../context/post-upload-context";

const PostUploadContainer = ({ setShow, show }) => {
  return (
    <>
      <PostUploadProvider show={show} setShow={setShow}>
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
      </PostUploadProvider>
    </>
  );
};

export default PostUploadContainer;
