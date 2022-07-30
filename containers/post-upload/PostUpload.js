import Modal from "../../components/modal";
import PostUploadProvider, {
  PostUploadContext,
} from "../../context/PostUploadContext";
import PostUploadBoxContainer from "./PostUploadBox";

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
