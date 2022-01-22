import { useContext } from "react";
import UploadContext from "../../context/UploadContext";
import Button from "../modal/Button";

export default function DiscardBox() {
  const { dispatch, setShow, setShowDiscardBox } = useContext(UploadContext);

  const handleClose = () => {
    setShow(false);
    setShowDiscardBox(false);
    dispatch({ reset: true });
  };

  return (
    <div className="flex flex-col items-center w-[400px] pt-[30px]">
      <h1 className="font-medium text-[17px] mb-[5px]">Discard post?</h1>
      <p className="text-[14px] text-gray-300 mb-[25px]">
        If you leave, your edits won&apos;t be saved.
      </p>
      <Button onClick={handleClose} className={"text-red font-medium"}>
        Discard
      </Button>
      <Button onClick={() => setShowDiscardBox(false)}>Cancel</Button>
    </div>
  );
}
