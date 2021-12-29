import { useState } from "react";
import Modal from "../Modal";
import UploadContext from "../../context/UploadContext";
import UploadContainer from "./Upload";

export default function Upload({ show, setShow }) {
  const [error, setError] = useState({});
  const [files, setFiles] = useState("");
  const [caption, setCaption] = useState("");
  const [page, setPage] = useState(0);
  const [showDiscardBox, setShowDiscardBox] = useState(false);
  const [previewFiles, setPreviewFiles] = useState([]);

  return (
    <UploadContext.Provider
      value={{
        setShow,
        show,
        setPage,
        page,
        error,
        caption,
        setCaption,
        setError,
        setFiles,
        files,
        setPreviewFiles,
        previewFiles,
        setShowDiscardBox,
        showDiscardBox,
      }}
    >
      <Modal show={show} setShow={setShow} element={<UploadContainer />} />
    </UploadContext.Provider>
  );
}
