import PostUploadBoxContainer from "./post-upload-box";
import { Modal } from "../../../components/modal";
import { PostUploadContextProvider, PostUploadContext } from "../context";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};

const PostUploadContainer = ({ setShow, show }: Props) => {
  return (
    <PostUploadContextProvider show={show} setShow={setShow}>
      <PostUploadContext.Consumer>
        {({ blockClose }) => (
          <Modal
            show={show}
            setShow={setShow}
            onClose={blockClose}
            hideCloseIcon={false}
          >
            <PostUploadBoxContainer />
          </Modal>
        )}
      </PostUploadContext.Consumer>
    </PostUploadContextProvider>
  );
};

export default PostUploadContainer;
