import { usePostUploadContext } from "../../context/PostUploadContext";
import Button from "../../components/modal/Button";

const PostUploadDiscardBox = () => {
  const { dispatch, setShow, setShowDiscardBox } = usePostUploadContext();

  const handleClose = () => {
    setShow(false);
    setShowDiscardBox(false);
    dispatch({ type: "RESET" });
  };

  return (
    <div className="flex flex-col items-center w-screen sm:w-[400px] max-w-[400px] pt-[30px]">
      <h1 className="font-medium text-[17px] mb-[5px]">Discard post?</h1>
      <p className="text-[14px] text-gray-300 mb-[25px] text-center">
        If you leave, your edits won&apos;t be saved.
      </p>
      <Button onClick={handleClose} className={"text-red font-medium"}>
        Discard
      </Button>
      <Button onClick={() => setShowDiscardBox(false)}>Cancel</Button>
    </div>
  );
};

export default PostUploadDiscardBox;
