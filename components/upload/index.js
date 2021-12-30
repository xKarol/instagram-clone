import { useState, useReducer } from "react";
import Modal from "../Modal";
import UploadContext from "../../context/UploadContext";
import UploadContainer from "./Upload";
import { CROP_PAGE, CREATE_PAGE, SHARE_PAGE } from "../../constants/globals";

const initialState = {
  uploaded: false,
  page: 0,
  caption: "",
  error: {},
  files: [],
  previewFiles: [],
};

const reducer = (state, newState) => ({ ...state, ...newState });

export default function Upload({ show, setShow }) {
  const [showDiscardBox, setShowDiscardBox] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const blockClose = () => {
    if (
      state.page === CROP_PAGE ||
      state.page === CREATE_PAGE ||
      (state.page === SHARE_PAGE && !state.uploaded)
    ) {
      setShow(true);
      setShowDiscardBox(true);
    }
  };

  return (
    <UploadContext.Provider
      value={{
        state,
        dispatch,
        setShow,
        show,
        setShowDiscardBox,
        showDiscardBox,
      }}
    >
      <Modal
        show={show}
        setShow={setShow}
        element={<UploadContainer />}
        onClose={blockClose}
      />
    </UploadContext.Provider>
  );
}
